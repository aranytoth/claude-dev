# WordPress-like CMS - Laravel Application

A full-featured Content Management System built with Laravel 10 and PHP. Features a comprehensive admin panel with Bootstrap 5 and a clean public frontend - similar to WordPress but built from scratch with Laravel.

## Features

### Admin Panel (Bootstrap 5)
- **Dashboard** with statistics and recent posts
- **Posts Management** - Create, edit, delete posts with categories and tags
- **Pages Management** - Create, edit, delete static pages
- **Categories Management** - Organize posts by categories
- **Tags Management** - Tag system for posts
- **User Management** - Admin-only user CRUD with roles (Admin/User)
- **TinyMCE Editor** - Rich text editor integration for posts and pages
- **Authentication** - Secure login with session management

### Public Frontend
- Responsive design with Bootstrap 5
- Homepage with latest posts (paginated)
- Single post and page views
- Category and tag archive pages
- Clean, modern UI
- SEO-friendly URLs (automatic slugs)

## Tech Stack

- **Framework:** Laravel 10
- **Language:** PHP 8.1+
- **Database:** SQLite (MySQL/PostgreSQL compatible)
- **Template Engine:** Blade
- **Frontend:** Bootstrap 5, Bootstrap Icons
- **Rich Text Editor:** TinyMCE
- **Authentication:** Laravel's built-in Auth

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- SQLite (or MySQL/PostgreSQL)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Composer dependencies**
   ```bash
   composer install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Configure database**

   For SQLite (default):
   ```bash
   touch database/database.sqlite
   ```

   Or edit `.env` for MySQL/PostgreSQL:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Add TinyMCE API Key**

   Get a free API key from https://www.tiny.cloud/ and add to `.env`:
   ```
   TINYMCE_API_KEY=your-tinymce-api-key-here
   ```

7. **Run migrations**
   ```bash
   php artisan migrate
   ```

8. **Seed the database**
   ```bash
   php artisan db:seed
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

10. **Access the application**
    - Public Site: http://localhost:8000
    - Admin Panel: http://localhost:8000/login

## Default Credentials

After seeding the database:

- **Email:** admin@example.com
- **Password:** admin123

**Important:** Change these credentials immediately after first login!

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Admin panel controllers
│   │   │   ├── Auth/           # Authentication controllers
│   │   │   └── HomeController.php  # Public frontend controller
│   │   └── Middleware/
│   └── Models/                 # Eloquent models
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/               # Database seeders
├── public/
│   └── css/                   # Custom CSS files
├── resources/
│   └── views/
│       ├── admin/             # Admin panel views
│       ├── public/            # Public frontend views
│       └── layouts/           # Blade layouts
└── routes/
    └── web.php                # Route definitions
```

## Usage

### Admin Panel Routes

All admin routes are protected by authentication middleware:

- `/admin/dashboard` - Dashboard
- `/admin/posts` - Posts management
- `/admin/pages` - Pages management
- `/admin/categories` - Categories management
- `/admin/tags` - Tags management
- `/admin/users` - User management (admin only)

### Public Routes

- `/` - Homepage (latest posts)
- `/post/{slug}` - Single post view
- `/page/{slug}` - Single page view
- `/category/{slug}` - Category archive
- `/tag/{slug}` - Tag archive

## Database Schema

### Users
- id, name, email, password, role, remember_token, timestamps

### Posts
- id, title, slug, content, excerpt, featured_image, status, user_id, category_id, published_at, timestamps

### Pages
- id, title, slug, content, status, user_id, template, published_at, timestamps

### Categories
- id, name, slug, description, timestamps

### Tags
- id, name, slug, timestamps

### Post_Tag (Pivot)
- id, post_id, tag_id, timestamps

## Customization

### Adding New Templates

Edit `resources/views/admin/pages/create.blade.php` and `edit.blade.php` to add new page templates to the dropdown.

### Styling

- Admin styles: `public/css/admin.css`
- Public styles: `public/css/public.css`

### TinyMCE Configuration

Edit the TinyMCE init configuration in:
- `resources/views/admin/posts/create.blade.php`
- `resources/views/admin/posts/edit.blade.php`
- `resources/views/admin/pages/create.blade.php`
- `resources/views/admin/pages/edit.blade.php`

## Artisan Commands

```bash
# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Create new migration
php artisan make:migration create_table_name

# Create new controller
php artisan make:controller ControllerName

# Create new model
php artisan make:model ModelName
```

## Security

- Passwords are hashed using bcrypt
- CSRF protection on all forms
- Authentication middleware on admin routes
- Role-based access control (admin/user)
- SQL injection protection via Eloquent ORM

## License

MIT License

## Support

For issues and questions, please refer to Laravel documentation:
- https://laravel.com/docs
- https://www.tiny.cloud/docs/ (TinyMCE)

---

Built with Laravel and PHP by Claude Code
