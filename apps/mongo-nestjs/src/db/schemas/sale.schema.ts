import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  salesPersonId: Types.ObjectId;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

// Virtual populate for product
SaleSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for salesPerson
SaleSchema.virtual('salesPerson', {
  ref: 'User',
  localField: 'salesPersonId',
  foreignField: '_id',
  justOne: true,
});

// Enable virtual fields in JSON output
SaleSchema.set('toJSON', { virtuals: true });
SaleSchema.set('toObject', { virtuals: true });
