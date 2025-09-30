import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token)
    return NextResponse.json({ message: "Token is required" }, { status: 400 });

  // verify recaptcha
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, {
    method: "POST",
  });

  const captchaResponse = await response.json();
  if (!captchaResponse.success) {
    return NextResponse.json(
      { message: "Failed to verify reCAPTCHA" },
      { status: 400 }
    );
  }

  // validate credentials
  try {
    const body = await req.json();
   //  const formData = new FormData();
   //  formData.append("username", body.username);
   //  formData.append("password", body.password);

   //  await signIn("credentials", {
   //    username: body.username,
   //    password: body.password,
   //    redirect: false,
   //  });

   const user = await prisma.user.findUnique({
      where: {
         username: body.username
      }
   })

   if (user) {
      const isValid = await bcrypt.compare(body.password as string, user.password)
      if (isValid) {
         await signIn("credentials", {
             username: body.username,
             redirect: false
         })
         return NextResponse.json({ message: "Login successful" });
      }
   }

   throw new Error("Invalid username or password");
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
