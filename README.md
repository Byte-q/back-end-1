# FULLSCO Backend API

A comprehensive backend API for the FULLSCO scholarship platform built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **RESTful API** with comprehensive endpoints
- **Authentication & Authorization** with JWT and sessions
- **Database Management** with Drizzle ORM and PostgreSQL
- **File Upload** support for images and documents
- **Rate Limiting** and security middleware
- **Docker** containerization for easy deployment
- **TypeScript** for type safety
- **Comprehensive Documentation** and examples

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- Docker & Docker Compose (for containerized deployment)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd fullsco-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file with your configuration
nano .env
```

### 4. Database Setup
```bash
# Generate database migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database with initial data (optional)
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 🐳 Docker Deployment

### Development with Docker Compose

```bash
# Start all services (database + backend)
docker-compose up -d

# Setup database (first time only)
docker-compose --profile setup up db-setup

# View logs
docker-compose logs -f backend
```

### Production Deployment

```bash
# Make sure you have a proper .env file
cp env.example .env
# Edit .env with production values

# Deploy using the deployment script
./deploy.sh deploy

# Or deploy with database seeding
./deploy.sh seed

# Check status
./deploy.sh status

# View logs
./deploy.sh logs

# Stop services
./deploy.sh stop
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000/server/api`
- Production: `https://your-domain.com/server/api`

### Authentication Endpoints

#### Register User
```http
POST /server/api/auth/register
Content-Type: application/json

{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

#### Login
```http
POST /server/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /server/api/auth/logout
Authorization: Bearer <token>
```

### Scholarship Endpoints

#### Get All Scholarships
```http
GET /server/api/scholarships
```

#### Get Featured Scholarships
```http
GET /server/api/scholarships/featured
```

#### Get Scholarship by Slug
```http
GET /server/api/scholarships/fulbright-scholarship-program
```

#### Create Scholarship (Admin only)
```http
POST /server/api/scholarships
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "New Scholarship",
  "slug": "new-scholarship",
  "description": "Description here",
  "content": "Full content here",
  "deadline": "2024-12-31",
  "amount": "Full tuition",
  "university": "University Name",
  "countryId": 1,
  "levelId": 1,
  "categoryId": 1
}
```

### Categories Endpoints

#### Get All Categories
```http
GET /server/api/categories
```

#### Get Category by Slug
```http
GET /server/api/categories/engineering
```

### Countries Endpoints

#### Get All Countries
```http
GET /server/api/countries
```

#### Get Country by Slug
```http
GET /server/api/countries/united-states
```

### Posts Endpoints

#### Get All Posts
```http
GET /server/api/posts
```

#### Get Featured Posts
```http
GET /server/api/posts/featured
```

#### Get Post by Slug
```http
GET /server/api/posts/how-to-apply-for-international-scholarships
```

### Success Stories Endpoints

#### Get All Success Stories
```http
GET /server/api/success-stories
```

#### Get Success Story by Slug
```http
GET /server/api/success-stories/from-egypt-to-mit-journey-to-success
```

### Admin Endpoints

#### Get Dashboard Statistics
```http
GET /server/api/statistics/dashboard
Authorization: Bearer <admin-token>
```

#### Get All Users
```http
GET /server/api/users
Authorization: Bearer <admin-token>
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | Required |
| `SESSION_SECRET` | Session secret | Required |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `UPLOAD_DIR` | File upload directory | ./uploads |
| `MAX_FILE_SIZE` | Maximum file size (bytes) | 5242880 |

### Database Schema

The application uses the following main tables:
- `users` - User accounts and authentication
- `scholarships` - Scholarship listings
- `categories` - Scholarship categories
- `levels` - Education levels
- `countries` - Countries offering scholarships
- `posts` - Blog posts and articles
- `success_stories` - Student success stories
- `subscribers` - Newsletter subscribers
- `media_files` - Uploaded files
- `statistics` - Analytics data

## 🚀 Deployment Options

### 1. Docker Compose (Recommended)

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Development deployment
docker-compose up -d
```

### 2. Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 3. Cloud Platforms

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

#### Heroku
```bash
# Install Heroku CLI and deploy
heroku create fullsco-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### DigitalOcean App Platform
- Connect your GitHub repository
- Set environment variables
- Deploy automatically

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** on API endpoints
- **JWT** token authentication
- **Session management**
- **Input validation** with Zod
- **SQL injection protection** with Drizzle ORM
- **File upload validation**

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```http
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### Logging
The application logs all requests with timing information:
```
2024-01-15T10:30:00.000Z - GET /server/api/scholarships
GET /server/api/scholarships 200 - 45ms
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Database Migrations

```bash
# Generate new migration
npm run db:generate

# Run migrations
npm run db:migrate

# View migration status
npm run db:studio
```

## 🔄 API Versioning

The API uses URL versioning with the prefix `/server/api`. Future versions can be added as `/server/api/v2/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🗺️ Roadmap

- [ ] Add comprehensive test suite
- [ ] Implement caching with Redis
- [ ] Add real-time notifications
- [ ] Implement advanced search with Elasticsearch
- [ ] Add API rate limiting dashboard
- [ ] Implement webhook system
- [ ] Add multi-language support
- [ ] Implement advanced analytics

---

**FULLSCO Backend** - Empowering students worldwide with scholarship opportunities! 🎓
