const db = require('./database');
const slugify = require('slugify');

class Page {
  static getAll(status = null) {
    let query = `
      SELECT p.*, u.username as author_name
      FROM pages p
      LEFT JOIN users u ON p.author_id = u.id
    `;

    if (status) {
      query += ' WHERE p.status = ?';
      const stmt = db.prepare(query + ' ORDER BY p.created_at DESC');
      return stmt.all(status);
    }

    const stmt = db.prepare(query + ' ORDER BY p.created_at DESC');
    return stmt.all();
  }

  static getPublished() {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name
      FROM pages p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.status = 'published'
      ORDER BY p.title ASC
    `);
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name
      FROM pages p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `);
    return stmt.get(id);
  }

  static getBySlug(slug) {
    const stmt = db.prepare(`
      SELECT p.*, u.username as author_name
      FROM pages p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.slug = ?
    `);
    return stmt.get(slug);
  }

  static create(title, content, status, authorId, template = 'default') {
    const slug = slugify(title, { lower: true, strict: true });
    const publishedAt = status === 'published' ? new Date().toISOString() : null;

    const stmt = db.prepare(`
      INSERT INTO pages (title, slug, content, status, author_id, template, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(title, slug, content, status, authorId, template, publishedAt);
    return result.lastInsertRowid;
  }

  static update(id, title, content, status, template) {
    const slug = slugify(title, { lower: true, strict: true });

    // Get current page to check if status changed to published
    const currentPage = this.getById(id);
    const publishedAt = (status === 'published' && currentPage.status !== 'published')
      ? new Date().toISOString()
      : currentPage.published_at;

    const stmt = db.prepare(`
      UPDATE pages
      SET title = ?, slug = ?, content = ?, status = ?, template = ?,
          published_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    return stmt.run(title, slug, content, status, template, publishedAt, id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM pages WHERE id = ?');
    return stmt.run(id);
  }

  static count(status = null) {
    if (status) {
      const stmt = db.prepare('SELECT COUNT(*) as count FROM pages WHERE status = ?');
      return stmt.get(status).count;
    }
    const stmt = db.prepare('SELECT COUNT(*) as count FROM pages');
    return stmt.get().count;
  }
}

module.exports = Page;
