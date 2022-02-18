import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  title: string;

  image: string;
  price: number;
  city: string;
  state: string;
  neighborhood: string;
  category: {
    connect: {
      id: string;
    };
  };
  author: {
    connect: {
      email: string;
    };
  };
}
