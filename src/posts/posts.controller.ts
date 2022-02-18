import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostInput } from './dto/createPost.input';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  listPosts(@Query('category') category: string) {
    return this.postsService.find(category);
  }

  @Get('categories')
  listCategories() {
    return this.postsService.findCategories();
  }

  @Get('my')
  getPosts(@Query('email') email: string) {
    return this.postsService.getPostsByUser(email);
  }

  @Post('alugar/:id')
  alugar(@Param('id') id: string, @Body() data: any) {
    return this.postsService.alugar(id, data);
  }

  @Post()
  createPost(@Body() post: CreatePostInput) {
    return this.postsService.create(post);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Body() data: any) {
    return this.postsService.remover(id);
  }
}
