# Nested Object Retrieval with Mongoose in NestJS

This document explains different techniques for retrieving nested objects in Mongoose with NestJS.

## 1. Embedded Documents (Current Setup)

Your current schemas use **embedded documents**. The Sale schema embeds Product and User directly:

```typescript
@Schema({ timestamps: true })
export class Sale {
  @Prop(ProductSchema)
  product: Product;

  @Prop(UserSchema)
  salesPerson: User;
}
```

### Querying Nested Fields

```typescript
// Query by nested property
async findByProductName(productName: string): Promise<Sale[]> {
  return await this.saleModel.find({ 'product.name': productName }).exec();
}

// Select specific nested fields
async findWithSelectedNestedFields(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .select('product.name product.barCode salesPerson.name salesPerson.email')
    .exec();
}

// Using projection
async findAllWithProjection(): Promise<any[]> {
  return await this.saleModel
    .find({}, { 'product.name': 1, 'salesPerson.name': 1, _id: 1 })
    .exec();
}
```

## 2. References with Populate (For Learning)

If you want to use **references** instead of embedded documents, you would define your schema like this:

```typescript
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Sale {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  salesPersonId: mongoose.Types.ObjectId;
}
```

### Using Populate

```typescript
// Populate single reference
async findOneWithProduct(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .populate('productId')
    .exec();
}

// Populate multiple references
async findOneWithAll(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .populate('productId')
    .populate('salesPersonId')
    .exec();
}

// Populate with specific fields
async findOneWithSelectedFields(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .populate('productId', 'name barCode')
    .populate('salesPersonId', 'name email')
    .exec();
}

// Populate nested references (if Product had a reference to Category)
async findOneWithNestedPopulate(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .populate({
      path: 'productId',
      populate: {
        path: 'categoryId',
        model: 'Category',
      },
    })
    .exec();
}

// Populate with conditions
async findOneWithConditionalPopulate(id: string): Promise<Sale | null> {
  return await this.saleModel
    .findById(id)
    .populate({
      path: 'productId',
      match: { name: { $regex: /^A/ } }, // Only populate if product name starts with 'A'
    })
    .exec();
}
```

## 3. Other Useful Techniques

### Using lean() for Performance

```typescript
// Returns plain JavaScript objects instead of Mongoose documents
async findLean(id: string): Promise<any> {
  return await this.saleModel.findById(id).lean().exec();
}
```

### Querying Arrays

```typescript
// If your schema has an array field
@Prop([{ type: String }])
tags: string[];

// Query array elements
async findByTag(tag: string): Promise<Sale[]> {
  return await this.saleModel.find({ tags: tag }).exec();
}

// Query with $in operator
async findByTags(tags: string[]): Promise<Sale[]> {
  return await this.saleModel.find({ tags: { $in: tags } }).exec();
}
```

### Aggregation for Complex Nested Queries

```typescript
async findWithAggregation(): Promise<any[]> {
  return await this.saleModel.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $match: { 'product.name': { $regex: /^A/ } },
    },
  ]).exec();
}
```

## 4. Best Practices

1. **Use embedded documents** when:
   - The nested object is small and doesn't change frequently
   - You always need the nested data together
   - The nested object is specific to the parent

2. **Use references with populate** when:
   - The nested object is large
   - The nested object is shared across multiple documents
   - You need to query the nested object independently
   - You want to avoid data duplication

3. **Performance considerations**:
   - `lean()` returns plain objects (faster, but no Mongoose features)
   - `select()` limits fields returned (faster queries)
   - `populate()` adds an extra query (can be slower for many documents)

## 5. Examples in This Codebase

- **Users Module**: Basic CRUD with nested object retrieval examples
- **Products Module**: Basic CRUD with nested object retrieval examples
- **Sales Module**: Advanced nested object retrieval examples with embedded documents

