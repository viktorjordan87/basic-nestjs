import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, InferSchemaType } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  barCode: string;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductType = InferSchemaType<typeof ProductSchema>;
