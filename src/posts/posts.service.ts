import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostInput } from './dto/createPost.input';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(post: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...post,
        published: true,
      },
    });
  }

  find(category: string) {
    return this.prisma.post.findMany({
      where: {
        published: true,
        categoryId: category,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            phone: true,
          },
        },
      },
    });
  }
  findCategories() {
    return this.prisma.category.findMany();
  }
  getPostsByUser(email: string) {
    return this.prisma.post.findMany({
      where: {
        author: {
          email: email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  alugar(id: string, data: any) {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data,
    });
  }

  remover(id: string) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
