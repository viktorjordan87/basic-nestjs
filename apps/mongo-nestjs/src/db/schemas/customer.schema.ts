import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, InferSchemaType, Types } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';

/* Customer Address Schema */
@Schema({ _id: false })
export class CustomerAddress {
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zip: string;
  @Prop()
  country: string;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);

/* Customer Schema */
@Schema({ timestamps: true })
export class Customer {
  @Prop({
    type: String,
    default: () => uuidv7(),
  })
  customerId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop(CustomerAddressSchema)
  address: CustomerAddress;

  @Prop({ default: true })
  isActive: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export type CustomerDocument = HydratedDocument<Customer>;

export type CustomerType = InferSchemaType<typeof CustomerSchema> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
