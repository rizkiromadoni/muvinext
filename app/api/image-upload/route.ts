import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Client } from "basic-ftp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const filePath = formData.get("filepath") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tmpDir = path.join(
      process.cwd(),
      "tmp",
      filePath ?? undefined
    );

    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\\s+/g, "_")}`;
    const filepath = path.join(tmpDir, filename);

    await fs.promises.writeFile(filepath, buffer);

    // FTP Upload
    const client = new Client();
    await client.access({
      host: process.env.FTP_HOST!,
      user: process.env.FTP_USER!,
      password: process.env.FTP_PASSWORD!,
      secure: false
    });

    await client.ensureDir(process.env.FTP_BASE_PATH!);
    await client.uploadFrom(filepath, filename);
    client.close();

    await fs.promises.rm(filepath);

    return NextResponse.json({
      url: new URL(`${process.env.FTP_BASE_PATH!}/${filename}`, process.env.FTP_BASE_URL!).href,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 500 }
    );
  }
}
