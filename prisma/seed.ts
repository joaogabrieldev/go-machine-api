import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding...');

  await prisma.category.createMany({
    data: [
      { name: 'Colhedora de cana ' },
      { name: 'Pulverizador' },
      { name: 'Plantadeira' },
      { name: 'Colheitadeira' },
      { name: 'Podador' },
      { name: 'Arado' },
    ],
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'joao@eaj.br',
      name: 'João Gabriel',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      phone: '84996039373',
      posts: {
        create: {
          title: 'Trator de carga',
          content:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
          published: true,
          image: 'https://i.ytimg.com/vi/yvZu-BPW2MA/hqdefault.jpg',
          price: 500.5,
          city: 'São Paulo',
          state: 'SP',
          neighborhood: 'Vila Mariana',
          category: {
            create: {
              name: 'Trator',
            },
          },
        },
      },
    },
  });

  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
