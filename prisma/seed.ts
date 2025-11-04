import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const totalData = 100;

  for (let i = 1; i <= totalData; i++) {
    await prisma.blog.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        title: `Blog ${i}`,
        slug: `blog-${i}`,
        content: `This is the content of blog ${i}.`,
        userId: 1,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
