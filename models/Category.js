const db = require('./database');
const slugify = require('slugify');

class Category {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM categories ORDER BY name ASC');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id);
  }

  static getBySlug(slug) {
    const stmt = db.prepare('SELECT * FROM categories WHERE slug = ?');
    return stmt.get(slug);
  }

  static create(name, description = '') {
    const slug = slugify(name, { lower: true, strict: true });
    const stmt = db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)');
    const result = stmt.run(name, slug, description);
    return result.lastInsertRowid;
  }

  static update(id, name, description) {
    const slug = slugify(name, { lower: true, strict: true });
    const stmt = db.prepare('UPDATE categories SET name = ?, slug = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(name, slug, description, id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    return stmt.run(id);
  }

  static count() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM categories');
    return stmt.get().count;
  }

  static getPostCount(categoryId) {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM posts WHERE category_id = ? AND status = "published"');
    return stmt.get(categoryId).count;
  }
}

module.exports = Category;
