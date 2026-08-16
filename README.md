# 🌱 Agric-Connect Backend

The backend API for **Agric-Connect**, a web platform designed to connect farmers and buyers across East Africa.

Agric-Connect provides a secure and scalable REST API for user authentication, farmer product management, product discovery, and role-based access control.

## 🚀 Features

* 🔐 JWT-based authentication
* 👥 Role-based access control (RBAC)
* 👨‍🌾 Farmer and buyer user roles
* 📦 Product management
* 🖼️ Product image uploads using Multer
* 🔎 Product retrieval and filtering
* 🗄️ MongoDB database with Mongoose
* ⚡ Redis caching for improved API performance
* 🔒 Password hashing with bcrypt
* 🛡️ Helmet security middleware
* 🌐 CORS configuration
* 📊 Structured controllers, services, models, and routes
* 🔑 Protected API endpoints
* ⚙️ Environment-based configuration

## 🛠️ Tech Stack

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | Backend runtime               |
| Express.js | REST API framework            |
| MongoDB    | Database                      |
| Mongoose   | MongoDB ODM                   |
| Redis      | Caching                       |
| JWT        | Authentication                |
| bcrypt     | Password hashing              |
| Multer     | Image uploads                 |
| Helmet     | HTTP security                 |
| CORS       | Cross-origin resource sharing |
| Postman    | API testing                   |

## 📁 Project Structure

```text
src/
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── upload.middleware.js
│   └── ...
│
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   ├── role.model.js
│   └── permission.model.js
│
├── routes/
│   ├── auth.route.js
│   └── product.route.js
│
├── services/
│   ├── auth.service.js
│   └── product.service.js
│
├── app.js
└── server.js

uploads/
.env
.gitignore
package.json
README.md
```

## 🔐 Authentication

Agric-Connect uses **JSON Web Tokens (JWT)** to authenticate users.

The authentication flow is:

```text
User
 │
 ▼
Register
 │
 ▼
Password hashed with bcrypt
 │
 ▼
Login
 │
 ▼
JWT generated
 │
 ▼
Authenticated requests
 │
 ▼
JWT middleware
 │
 ▼
Protected controller
```

A successful login returns an authentication token that can be used when accessing protected endpoints.

Example:

```http
Authorization: Bearer <your_token>
```

## 👥 User Roles

The platform supports different user roles.

### Farmer

Farmers can:

* Create products
* Upload product images
* Manage their products
* View their products
* Provide product information such as price, quantity, category, and location

### Buyer

Buyers can:

* Browse available products
* View product details
* Discover products from farmers

### Admin

The system can be extended to provide administrators with capabilities such as:

* Managing users
* Managing farmers
* Managing products
* Managing roles and permissions
* Monitoring platform activity

## 📦 Product Management

Products contain information such as:

```text
name
description
price
quantity
category
image
location
sellerId
```

The `sellerId` establishes a relationship between a product and the farmer who created it.

Product information can also be populated with the associated seller information using Mongoose.

## 🖼️ Image Uploads

Agric-Connect uses **Multer** to process product image uploads.

Example request:

```http
POST /api/products
Content-Type: multipart/form-data
```

Example form fields:

```text
name
description
price
quantity
category
location
image
```

Uploaded images are processed by the backend before the product is stored.

## ⚡ Redis Caching

Redis is used to cache frequently requested product data.

The general request flow is:

```text
Client
  │
  ▼
API
  │
  ▼
Check Redis
  │
  ├── Cache Hit ──────► Return cached data
  │
  └── Cache Miss
          │
          ▼
       MongoDB
          │
          ▼
      Store in Redis
          │
          ▼
      Return data
```

This reduces unnecessary database queries and can improve response times for frequently accessed resources.

## 🗄️ Database

MongoDB is used as the primary database.

Main collections include:

```text
users
products
roles
permissions
```

Mongoose is used to define schemas, relationships, validation, and database operations.

## 🛡️ Security

Several security practices are implemented in the API:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Role-based authorization
* Helmet HTTP security headers
* CORS configuration
* Environment variables for sensitive configuration
* Input validation
* Authentication middleware

Sensitive values such as database credentials and JWT secrets are stored in environment variables.

## 🌐 API Endpoints

### Authentication

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register a user |
| POST   | `/api/auth/login`    | Login a user    |

### Products

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/products`     | Create a product            |
| GET    | `/api/products`     | Retrieve products           |
| GET    | `/api/products/:id` | Retrieve a specific product |
| PUT    | `/api/products/:id` | Update a product            |
| DELETE | `/api/products/:id` | Delete a product            |

> Endpoint names may be adjusted to match the current route configuration.

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REDIS_URL=redis://localhost:6379
```

Never commit `.env` files or other secrets to GitHub.

Add them to `.gitignore`:

```gitignore
.env
node_modules/
uploads/
```

## 🏃 Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Enter the project

```bash
cd agric-connect-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add your MongoDB, JWT, Redis, and server configuration.

### 5. Start Redis

If Redis is running through Docker:

```bash
docker run -d \
  --name redis-server \
  -p 6379:6379 \
  redis
```

### 6. Start the development server

```bash
npm run dev
```

The API should now be available at:

```text
http://localhost:3000
```

## 🧪 API Testing

The API can be tested using **Postman**.

Recommended testing flow:

```text
Register
   ↓
Login
   ↓
Copy JWT
   ↓
Add Authorization header
   ↓
Access protected endpoints
   ↓
Create / retrieve products
```

Example authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

## 📈 Performance

The backend currently uses Redis caching to reduce repeated MongoDB queries.

Future performance improvements can include:

* Database indexing
* Pagination
* Query optimization
* Compression
* Rate limiting
* Connection pooling
* Background jobs
* Load balancing
* Horizontal scaling
* CDN-based image delivery

## 🔮 Future Improvements

Planned improvements include:

* 🔍 Advanced product search
* 📍 Location-based product discovery
* 💬 Farmer-buyer messaging
* 🔔 Notifications
* ⭐ Product reviews and ratings
* 💳 Payment integration
* ☁️ Cloud-based image storage
* 📊 Admin analytics dashboard
* 🧱 Docker containerization
* ☸️ Kubernetes deployment
* 🚀 CI/CD pipeline
* 📖 Swagger/OpenAPI documentation

## 🎯 Project Goals

Agric-Connect aims to provide a digital marketplace where farmers can reach potential buyers while giving buyers an easier way to discover agricultural products.

The backend is also designed as a practical demonstration of modern backend development concepts including:

* REST API design
* Authentication and authorization
* Database modeling
* Caching
* File handling
* API security
* Performance optimization
* Scalable backend architecture

## 👨‍💻 Author

**Kuol Magok**

Backend-focused developer building applications with:

```text
Node.js
Express.js
MongoDB
Redis
Docker
React
Linux
```

---

⭐ If you find this project useful, consider giving the repository a star.
