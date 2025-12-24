# How to Create a Sale with References

The Sale model now uses **ObjectId references** to Product and User models, and uses `populate()` to retrieve the full objects.

## Schema Structure

The Sale schema stores only the IDs:
```typescript
@Schema({ timestamps: true })
export class Sale {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  salesPersonId: Types.ObjectId;
}
```

## Creating a Sale

### Step 1: Create a Product (if not exists)
```bash
POST http://localhost:3003/products
Content-Type: application/json

{
  "name": "Laptop",
  "barCode": "123456789"
}
```

**Response:**
```json
{
  "_id": "694bf75dc52145bc91b1510c",
  "name": "Laptop",
  "barCode": "123456789",
  "__v": 0
}
```

### Step 2: Create a User (if not exists)
```bash
POST http://localhost:3003/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "_id": "694bf75dc52145bc91b1510d",
  "name": "John Doe",
  "email": "john@example.com",
  "__v": 0
}
```

### Step 3: Create a Sale using the IDs
```bash
POST http://localhost:3003/sales
Content-Type: application/json

{
  "productId": "694bf75dc52145bc91b1510c",
  "salesPersonId": "694bf75dc52145bc91b1510d"
}
```

**Response (without populate):**
```json
{
  "_id": "694bf75dc52145bc91b1510e",
  "productId": "694bf75dc52145bc91b1510c",
  "salesPersonId": "694bf75dc52145bc91b1510d",
  "createdAt": "2025-12-24T15:30:00.000Z",
  "updatedAt": "2025-12-24T15:30:00.000Z",
  "__v": 0
}
```

## Retrieving Sales with Populated Data

### Get All Sales (with populate)
```bash
GET http://localhost:3003/sales
```

**Response:**
```json
[
  {
    "_id": "694bf75dc52145bc91b1510e",
    "productId": {
      "_id": "694bf75dc52145bc91b1510c",
      "name": "Laptop",
      "barCode": "123456789",
      "__v": 0
    },
    "salesPersonId": {
      "_id": "694bf75dc52145bc91b1510d",
      "name": "John Doe",
      "email": "john@example.com",
      "__v": 0
    },
    "createdAt": "2025-12-24T15:30:00.000Z",
    "updatedAt": "2025-12-24T15:30:00.000Z",
    "__v": 0
  }
]
```

### Get Single Sale (with populate)
```bash
GET http://localhost:3003/sales/694bf75dc52145bc91b1510e
```

### Get Sales by Product ID
```bash
GET http://localhost:3003/sales/product-id/694bf75dc52145bc91b1510c
```

### Get Sales by Sales Person ID
```bash
GET http://localhost:3003/sales/salesperson-id/694bf75dc52145bc91b1510d
```

### Get Sale with Selected Fields Only
```bash
GET http://localhost:3003/sales/694bf75dc52145bc91b1510e/selected
```

**Response (only name and email for user, name and barCode for product):**
```json
{
  "_id": "694bf75dc52145bc91b1510e",
  "productId": {
    "_id": "694bf75dc52145bc91b1510c",
    "name": "Laptop",
    "barCode": "123456789"
  },
  "salesPersonId": {
    "_id": "694bf75dc52145bc91b1510d",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Available Endpoints

### Create
- `POST /sales` - Create a new sale

### Read (all use populate)
- `GET /sales` - Get all sales with populated Product and User
- `GET /sales/:id` - Get sale by ID with populated data
- `GET /sales/product-id/:productId` - Get sales by product ID
- `GET /sales/salesperson-id/:salesPersonId` - Get sales by sales person ID
- `GET /sales/product/:productName` - Get sales by product name (with populate)
- `GET /sales/:id/selected` - Get sale with selected fields only
- `GET /sales/:id/lean` - Get sale as plain JavaScript object
- `GET /sales/:id/nested-populate` - Example of nested populate
- `GET /sales/:id/conditional-populate` - Populate with conditions
- `GET /sales/projection` - Get all sales without populate (just IDs)

### Update
- `PATCH /sales/:id` - Update sale (returns populated data)

### Delete
- `DELETE /sales/:id` - Delete sale

## Key Concepts

1. **References**: Store only ObjectIds in the Sale document
2. **Populate**: Use `.populate()` to replace ObjectIds with full documents
3. **Model Names**: The `ref` in schema must match the model name registered in MongooseModule
   - `ref: 'Product'` → Model name from `Product.name` (which is 'Product')
   - `ref: 'User'` → Model name from `User.name` (which is 'User')

## Benefits of Using References

1. **Data Consistency**: Product and User data stored once, referenced multiple times
2. **Storage Efficiency**: No data duplication
3. **Easy Updates**: Update Product/User once, all sales reflect the change
4. **Flexible Queries**: Can query sales by product/user properties using populate

