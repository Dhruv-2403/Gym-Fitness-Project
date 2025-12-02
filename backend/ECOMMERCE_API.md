# 🛒 FitFusion E-Commerce API Documentation

## Overview
Complete e-commerce system for FitFusion app supporting products, shopping cart, and orders.

## Database Models

### Category
- `id` - Unique identifier
- `name` - Category name (unique)
- `description` - Optional description
- `products` - Related products

### Product
- `id` - Unique identifier
- `name` - Product name
- `description` - Product description
- `price` - Product price (Float)
- `imageUrl` - Product image URL
- `stock` - Available stock quantity
- `categoryId` - Foreign key to Category
- `category` - Related category

### CartItem
- `id` - Unique identifier
- `userId` - Foreign key to User
- `productId` - Foreign key to Product
- `quantity` - Item quantity
- `product` - Related product with category

### Order
- `id` - Unique identifier
- `userId` - Foreign key to User
- `totalAmount` - Total order amount
- `status` - Order status (pending, processing, shipped, delivered, cancelled)
- `shippingAddress` - Delivery address
- `items` - Order items

### OrderItem
- `id` - Unique identifier
- `orderId` - Foreign key to Order
- `productId` - Foreign key to Product
- `quantity` - Item quantity
- `price` - Price at time of purchase (snapshot)

---

## API Endpoints

### Products

#### GET `/api/products`
Get all products with optional filters.

**Query Parameters:**
- `category` - Filter by category ID
- `search` - Search in name/description

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Protein Powder",
      "description": "Whey protein",
      "price": 49.99,
      "imageUrl": "https://...",
      "stock": 50,
      "categoryId": 1,
      "category": { "id": 1, "name": "Supplements" }
    }
  ]
}
```

#### GET `/api/products/:id`
Get single product by ID.

**Response:**
```json
{
  "product": {
    "id": 1,
    "name": "Protein Powder",
    ...
  }
}
```

#### GET `/api/products/categories`
Get all categories.

**Response:**
```json
{
  "categories": [
    { "id": 1, "name": "Supplements", "description": "..." }
  ]
}
```

#### POST `/api/products`
Create a new product (admin only - add admin check later).

**Body:**
```json
{
  "name": "Protein Powder",
  "description": "Whey protein",
  "price": 49.99,
  "imageUrl": "https://...",
  "stock": 50,
  "categoryId": 1
}
```

---

### Cart (Requires Authentication)

#### GET `/api/cart`
Get user's cart with total.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "cartItems": [
    {
      "id": 1,
      "userId": 1,
      "productId": 1,
      "quantity": 2,
      "product": { ... }
    }
  ],
  "total": 99.98
}
```

#### POST `/api/cart`
Add item to cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

#### PUT `/api/cart/:id`
Update cart item quantity.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "quantity": 3
}
```

#### DELETE `/api/cart/:id`
Remove item from cart.

**Headers:**
```
Authorization: Bearer <token>
```

#### DELETE `/api/cart`
Clear entire cart.

**Headers:**
```
Authorization: Bearer <token>
```

---

### Orders (Requires Authentication)

#### POST `/api/orders`
Create order from cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "shippingAddress": "123 Main St, City, State 12345"
}
```

**Response:**
```json
{
  "order": {
    "id": 1,
    "userId": 1,
    "totalAmount": 99.98,
    "status": "pending",
    "shippingAddress": "123 Main St...",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "price": 49.99,
        "product": { ... }
      }
    ]
  }
}
```

**Note:** Cart is automatically cleared after order creation.

#### GET `/api/orders`
Get all user's orders.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "orders": [
    {
      "id": 1,
      "totalAmount": 99.98,
      "status": "pending",
      "items": [...]
    }
  ]
}
```

#### GET `/api/orders/:id`
Get single order by ID.

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT `/api/orders/:id/status`
Update order status (admin only - add admin check later).

**Body:**
```json
{
  "status": "shipped"
}
```

**Valid statuses:** `pending`, `processing`, `shipped`, `delivered`, `cancelled`

---

## Setup Instructions

### 1. Run Database Migration

```bash
cd backend
npx prisma migrate dev --name ecommerce
```

### 2. Seed Initial Data (Optional)

Create a seed file to add sample categories and products:

```javascript
// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const supplements = await prisma.category.create({
    data: { name: 'Supplements', description: 'Fitness supplements' }
  });
  
  const apparel = await prisma.category.create({
    data: { name: 'Apparel', description: 'Gym wear' }
  });
  
  const equipment = await prisma.category.create({
    data: { name: 'Equipment', description: 'Fitness equipment' }
  });

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Whey Protein',
        description: 'Premium whey protein powder',
        price: 49.99,
        stock: 50,
        categoryId: supplements.id
      },
      {
        name: 'Gym Shorts',
        description: 'Comfortable workout shorts',
        price: 29.99,
        stock: 30,
        categoryId: apparel.id
      }
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 3. Test the API

```bash
# Get products
curl http://localhost:3000/api/products

# Add to cart (requires auth token)
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"shippingAddress": "123 Main St"}'
```

---

## Next Steps (Optional Enhancements)

1. **Admin Authentication**: Add role-based access control for product creation and order management
2. **Payment Integration**: Integrate Stripe/PayPal for payment processing
3. **Inventory Management**: Add stock validation when adding to cart
4. **Product Reviews**: Add review/rating system
5. **Wishlist**: Add wishlist functionality
6. **Coupons/Discounts**: Add discount code system
7. **Shipping Options**: Add multiple shipping methods
8. **Order Tracking**: Add tracking number support

---

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

