

## 🛍️ Hamro Pasal - Full-Stack E-Commerce Platform

> A modern, full-stack e-commerce application built with Next.js 16, Express.js, and PostgreSQL

**Hamro Pasal** (meaning "Our Shop" in Nepali) is a feature-rich e-commerce platform that provides a seamless shopping experience with modern web technologies, secure authentication, and a responsive user interface.

---

### ✨ Key Features

#### 🎨 Frontend
- ⚡️ **Next.js 16** with App Router & React 19.2
- 🎯 **TypeScript** for type safety
- 🎨 **Tailwind CSS v4** for modern styling
- 🔐 **Google OAuth** integration
- 🛒 **Shopping Cart** functionality
- 👤 **User Profile Management** with avatar upload
- 🔍 **Product Search** & filtering
- 📱 **Responsive Design** (mobile-first approach)
- 🍞 **Toast Notifications** with react-hot-toast
- ⚡️ **React Compiler** for optimized performance

#### 🚀 Backend
- 🟢 **Node.js + Express.js** RESTful API
- 🗄️ **PostgreSQL** with Prisma ORM
- 🔒 **JWT Authentication** (HTTP-only cookies)
- 🖼️ **File Upload** with Multer
- ✅ **Zod Validation** for request schemas
- 📧 **Email Service** (password reset)
- 🧪 **Jest Testing** with 80%+ coverage
- 🛡️ **Centralized Error Handling**
- 🔄 **CORS** configured for cross-origin requests

---

### 🏗️ Architecture

```
hamro-pasal/
├── frontend/                    # Next.js 16 Application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── (auth)/         # Authentication routes
│   │   │   ├── (store)/        # Store pages
│   │   │   ├── dashboard/      # User dashboard
│   │   │   └── profile/        # User profile
│   │   ├── components/         # React components
│   │   │   ├── auth/           # Login, Register, OAuth
│   │   │   ├── cart/           # Shopping cart
│   │   │   ├── product/        # Product cards & details
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   └── ui/             # Reusable UI components
│   │   ├── context/            # React Context (Auth, Cart)
│   │   ├── hooks/              # Custom React hooks
│   │   └── lib/                # API client, types, utilities
│   └── package.json
│
└── hamro-pasal-backend/        # Express.js API
    ├── controllers/            # Business logic
    ├── routes/                 # API routes
    ├── middlewares/            # Auth, error handling
    ├── prisma/                 # Database schema & migrations
    ├── utils/                  # Helpers & utilities
    ├── validators/             # Zod schemas
    └── __tests__/              # Jest tests
```

---

### 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19.2, TypeScript, Tailwind CSS v4 |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | PostgreSQL |
| **Authentication** | JWT, Google OAuth, bcryptjs |
| **Validation** | Zod |
| **Testing** | Jest, Supertest |
| **File Upload** | Multer |
| **Email** | SendGrid / Nodemailer |
| **Dev Tools** | ESLint, Prettier, Nodemon |

---

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

#### Backend Setup

```bash
# 1. Navigate to backend
cd hamro-pasal-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cat > .env << EOL
DATABASE_URL="postgresql://user:password@localhost:5432/hamro_pasal"
JWT_SECRET="your-secret-key-here"
FRONTEND_URL="http://localhost:3000"
EOL

# 4. Generate Prisma Client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev

# 6. Seed database (optional)
npm run db:seed

# 7. Start server
npm start
```

Server runs on `http://localhost:5000`

#### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EOL

# 4. Start development server
npm run dev
```

App runs on `http://localhost:3000`

---

### 📡 API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login with credentials
- `POST /logout` - Logout user
- `GET /me` - Get current user
- `POST /google` - Google OAuth login
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `PATCH /change-password` - Change password

#### Users (`/api/users`)
- `GET /` - Get all users (admin)
- `GET /:id` - Get user by ID
- `PATCH /:id` - Update user profile
- `DELETE /:id` - Delete user
- `POST /upload` - Upload profile image

#### Products (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `GET /search/:query` - Search products
- `GET /category/:id` - Get products by category
- `POST /` - Create product (admin)
- `PUT /:id` - Update product (admin)
- `DELETE /:id` - Delete product (admin)

#### Cart (`/api/cart`)
- `GET /` - Get user cart
- `POST /add` - Add item to cart
- `PUT /update/:id` - Update cart item
- `DELETE /remove/:id` - Remove from cart
- `DELETE /clear` - Clear cart

#### Orders (`/api/orders`)
- `GET /` - Get user orders
- `GET /:id` - Get order by ID
- `POST /` - Create order
- `PATCH /:id` - Update order status

---

### 🧪 Testing

```bash
# Backend tests
cd hamro-pasal-backend
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

# Frontend tests (when implemented)
cd frontend
npm test
```

---

### 🔒 Environment Variables

#### Backend (`.env`)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
FRONTEND_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
SENDGRID_API_KEY="your-sendgrid-key"
NODE_ENV="development"
PORT="5000"
```

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
```

---

### 📦 Deployment

#### Backend
- **Railway** / **Render** / **Heroku**
- Set environment variables in platform
- Run migrations: `npx prisma migrate deploy`

#### Frontend
- **Vercel** (recommended for Next.js)
- Connect GitHub repo
- Set environment variables
- Auto-deploys on push

---

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

### 📝 License

This project is licensed under the ISC License.

---

### 👨‍💻 Author

**Roman Shrestha**
- GitHub: [@romanshrestha20](https://github.com/romanshrestha20)

---

### 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for excellent ORM
- Vercel for hosting platform
- Tailwind CSS for utility-first CSS

---

### 📸 Screenshots

_Add screenshots of your application here_

---

### 🗺️ Roadmap

- [ ] Add product reviews & ratings
- [ ] Implement wishlist/favorites
- [ ] Add payment gateway integration (Stripe/Khalti)
- [ ] Multi-language support (i18n)
- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Product recommendations
- [ ] Mobile app (React Native)

---

### 📞 Support

For support, email roman.shrestha20@example.com or open an issue in the repository.

---

**⭐ If you like this project, please give it a star!**

---

### Short Description for GitHub

```
🛍️ Hamro Pasal - Modern full-stack e-commerce platform built with Next.js 16, Express.js, PostgreSQL & Prisma. Features include JWT auth, Google OAuth, shopping cart, user profiles, and product management. TypeScript + Tailwind CSS + React 19.
```

### GitHub Topics/Tags
```
nextjs, react, typescript, expressjs, nodejs, postgresql, prisma, ecommerce, 
shopping-cart, jwt-authentication, google-oauth, tailwindcss, rest-api, 
full-stack, typescript, zod-validation, jest, multer
```

This comprehensive description provides everything needed for your GitHub repository! 🚀