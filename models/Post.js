const db = require('./database');
const slugify = require('slugify');

class Post {
  static getAll(status = null) {
    let query = `
      SELECT p.*, u.username as author_name, c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
    `;

    if (status) {
      query += ' WHERE p.status = ?';
      const stmt = db.prepare(query + ' ORDER BY p.created_at DESC');
      return stmt.all(status);
    }

    const stmt = db.prepare(query + ' ORDER BY p.created_at DESC');
    return stmt.all();
  }

  static getPublished(limit = null) {
    let query = `
      SELECT p.*, u.username as author_name, c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      ORDER BY p.published_at DESC
    `;

    if (limit) {
      query += ' LIMIT ?';
      const stmt = db.prepare(query);
      return stmt.all(limit);
    }

    const stmt = db.prepare(query);
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name, c.name as category_name, c.id as category_id
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `);
    return stmt.get(id);
  }

  static getBySlug(slug) {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name, c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `);
    return stmt.get(slug);
  }

  static create(title, content, excerpt, status, authorId, categoryId = null, featuredImage = null) {
    const slug = slugify(title, { lower: true, strict: true });
    const publishedAt = status === 'published' ? new Date().toISOString() : null;

    const stmt = db.prepare(`
      INSERT INTO posts (title, slug, content, excerpt, status, author_id, category_id, featured_image, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(title, slug, content, excerpt, status, authorId, categoryId, featuredImage, publishedAt);
    return result.lastInsertRowid;
  }

  static update(id, title, content, excerpt, status, categoryId, featuredImage) {
    const slug = slugify(title, { lower: true, strict: true });

    // Get current post to check if status changed to published
    const currentPost = this.getById(id);
    const publishedAt = (status === 'published' && currentPost.status !== 'published')
      ? new Date().toISOString()
      : currentPost.published_at;

    const stmt = db.prepare(`
      UPDATE posts
      SET title = ?, slug = ?, content = ?, excerpt = ?, status = ?,
          category_id = ?, featured_image = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    return stmt.run(title, slug, content, excerpt, status, categoryId, featuredImage, publishedAt, id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
    return stmt.run(id);
  }

  static count(status = null) {
    if (status) {
      const stmt = db.prepare('SELECT COUNT(*) as count FROM posts WHERE status = ?');
      return stmt.get(status).count;
    }
    const stmt = db.prepare('SELECT COUNT(*) as count FROM posts');
    return stmt.get().count;
  }

  static getByCategory(categoryId, status = 'published') {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name, c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.status = ?
      ORDER BY p.published_at DESC
    `);
    return stmt.all(categoryId, status);
  }

  static getByTag(tagId, status = 'published') {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name, c.name as category_name
      FROM posts p
      INNER JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE pt.tag_id = ? AND p.status = ?
      ORDER BY p.published_at DESC
    `);
    return stmt.all(tagId, status);
  }
}

module.exports = Post;
