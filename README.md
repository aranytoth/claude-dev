# WordPress-like CMS Application

A full-featured Content Management System built with Node.js, Express, and Bootstrap 5. Features a comprehensive admin panel and a clean public frontend.

## Features

- **Admin Panel** (Bootstrap 5)
  - User management with role-based access control
  - Posts management with categories and tags
  - Pages management
  - Categories and tags management
  - TinyMCE rich text editor integration
  - Responsive dashboard with statistics

- **Public Frontend**
  - Clean, responsive design
  - Blog post listing
  - Single post and page views
  - Category and tag archives
  - SEO-friendly URLs (slugs)

- **Authentication**
  - Secure login system
  - Password hashing with bcrypt
  - Session management
  - Role-based access (Admin/User)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (better-sqlite3)
- **Template Engine:** EJS
- **Frontend:** Bootstrap 5, Bootstrap Icons
- **Rich Text Editor:** TinyMCE
- **Security:** bcryptjs, express-session

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file and add your TinyMCE API key:
   ```
   TINYMCE_API_KEY=your-api-key-here
   ```
   Get a free TinyMCE API key from: https://www.tiny.cloud/

5. Initialize the database:
   ```bash
   npm run init-db
   ```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Default Admin Credentials

After running `npm run init-db`, you can log in with:

- **Email:** admin@example.com
- **Password:** admin123

**Important:** Change these credentials immediately after first login!

## Project Structure

```
.
├── database/           # SQLite database
├── models/            # Database models
├── routes/            # Express routes (admin & public)
├── views/             # EJS templates
│   ├── admin/        # Admin panel views
│   ├── public/       # Public frontend views
│   └── partials/     # Reusable partials
├── middleware/        # Custom middleware
├── public/           # Static files (CSS, JS, uploads)
├── scripts/          # Utility scripts
└── server.js         # Main application file
```

## API Endpoints

### Admin Routes (requires authentication)

- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/posts` - List all posts
- `GET /admin/posts/new` - Create new post
- `GET /admin/posts/:id/edit` - Edit post
- `GET /admin/pages` - List all pages
- `GET /admin/categories` - List all categories
- `GET /admin/tags` - List all tags
- `GET /admin/users` - List all users (admin only)

### Public Routes

- `GET /` - Homepage (latest posts)
- `GET /post/:slug` - Single post
- `GET /page/:slug` - Single page
- `GET /category/:slug` - Category archive
- `GET /tag/:slug` - Tag archive

## Database Schema

### Users
- id, username, email, password (hashed), role, created_at, updated_at

### Posts
- id, title, slug, content, excerpt, featured_image, status, author_id, category_id, created_at, updated_at, published_at

### Pages
- id, title, slug, content, status, author_id, template, created_at, updated_at, published_at

### Categories
- id, name, slug, description, created_at, updated_at

### Tags
- id, name, slug, created_at, updated_at

### Post_Tags (junction table)
- post_id, tag_id

## License

MIT
