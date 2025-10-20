const db = require('./database');
const slugify = require('slugify');

class Tag {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM tags ORDER BY name ASC');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM tags WHERE id = ?');
    return stmt.get(id);
  }

  static getBySlug(slug) {
    const stmt = db.prepare('SELECT * FROM tags WHERE slug = ?');
    return stmt.get(slug);
  }

  static create(name) {
    const slug = slugify(name, { lower: true, strict: true });
    const stmt = db.prepare('INSERT INTO tags (name, slug) VALUES (?, ?)');
    const result = stmt.run(name, slug);
    return result.lastInsertRowid;
  }

  static update(id, name) {
    const slug = slugify(name, { lower: true, strict: true });
    const stmt = db.prepare('UPDATE tags SET name = ?, slug = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(name, slug, id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM tags WHERE id = ?');
    return stmt.run(id);
  }

  static count() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM tags');
    return stmt.get().count;
  }

  static getPostTags(postId) {
    const stmt = db.prepare(`
      SELECT t.* FROM tags t
      INNER JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
      ORDER BY t.name ASC
    `);
    return stmt.all(postId);
  }

  static addToPost(postId, tagId) {
    const stmt = db.prepare('INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)');
    return stmt.run(postId, tagId);
  }

  static removeFromPost(postId, tagId) {
    const stmt = db.prepare('DELETE FROM post_tags WHERE post_id = ? AND tag_id = ?');
    return stmt.run(postId, tagId);
  }

  static clearPostTags(postId) {
    const stmt = db.prepare('DELETE FROM post_tags WHERE post_id = ?');
    return stmt.run(postId);
  }
}

module.exports = Tag;
