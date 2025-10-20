const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin, redirectIfAuthenticated } = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Page = require('../models/Page');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

// Login routes
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('admin/login', { title: 'Login' });
});

router.post('/login', redirectIfAuthenticated, (req, res) => {
  const { email, password } = req.body;

  const user = User.getByEmail(email);

  if (!user || !User.verifyPassword(password, user.password)) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/admin/login');
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.userRole = user.role;

  req.flash('success', 'Welcome back, ' + user.username + '!');
  res.redirect('/admin/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  const stats = {
    posts: Post.count(),
    publishedPosts: Post.count('published'),
    pages: Page.count(),
    users: User.count(),
    categories: Category.count(),
    tags: Tag.count()
  };

  const recentPosts = Post.getAll().slice(0, 5);

  res.render('admin/dashboard', {
    title: 'Dashboard',
    stats,
    recentPosts
  });
});

// Posts routes
router.get('/posts', isAuthenticated, (req, res) => {
  const posts = Post.getAll();
  res.render('admin/posts/index', { title: 'All Posts', posts });
});

router.get('/posts/new', isAuthenticated, (req, res) => {
  const categories = Category.getAll();
  const tags = Tag.getAll();
  res.render('admin/posts/form', {
    title: 'New Post',
    post: null,
    categories,
    tags,
    postTags: []
  });
});

router.post('/posts', isAuthenticated, (req, res) => {
  try {
    const { title, content, excerpt, status, category_id } = req.body;
    const tags = req.body.tags || [];

    const postId = Post.create(
      title,
      content || '',
      excerpt || '',
      status || 'draft',
      req.session.userId,
      category_id || null
    );

    // Add tags
    if (Array.isArray(tags)) {
      tags.forEach(tagId => Tag.addToPost(postId, tagId));
    } else if (tags) {
      Tag.addToPost(postId, tags);
    }

    req.flash('success', 'Post created successfully');
    res.redirect('/admin/posts');
  } catch (err) {
    req.flash('error', 'Error creating post: ' + err.message);
    res.redirect('/admin/posts/new');
  }
});

router.get('/posts/:id/edit', isAuthenticated, (req, res) => {
  const post = Post.getById(req.params.id);
  if (!post) {
    req.flash('error', 'Post not found');
    return res.redirect('/admin/posts');
  }

  const categories = Category.getAll();
  const tags = Tag.getAll();
  const postTags = Tag.getPostTags(post.id);

  res.render('admin/posts/form', {
    title: 'Edit Post',
    post,
    categories,
    tags,
    postTags
  });
});

router.put('/posts/:id', isAuthenticated, (req, res) => {
  try {
    const { title, content, excerpt, status, category_id } = req.body;
    const tags = req.body.tags || [];

    Post.update(
      req.params.id,
      title,
      content || '',
      excerpt || '',
      status || 'draft',
      category_id || null,
      null
    );

    // Update tags
    Tag.clearPostTags(req.params.id);
    if (Array.isArray(tags)) {
      tags.forEach(tagId => Tag.addToPost(req.params.id, tagId));
    } else if (tags) {
      Tag.addToPost(req.params.id, tags);
    }

    req.flash('success', 'Post updated successfully');
    res.redirect('/admin/posts');
  } catch (err) {
    req.flash('error', 'Error updating post: ' + err.message);
    res.redirect('/admin/posts/' + req.params.id + '/edit');
  }
});

router.delete('/posts/:id', isAuthenticated, (req, res) => {
  try {
    Post.delete(req.params.id);
    req.flash('success', 'Post deleted successfully');
    res.redirect('/admin/posts');
  } catch (err) {
    req.flash('error', 'Error deleting post: ' + err.message);
    res.redirect('/admin/posts');
  }
});

// Pages routes
router.get('/pages', isAuthenticated, (req, res) => {
  const pages = Page.getAll();
  res.render('admin/pages/index', { title: 'All Pages', pages });
});

router.get('/pages/new', isAuthenticated, (req, res) => {
  res.render('admin/pages/form', {
    title: 'New Page',
    page: null
  });
});

router.post('/pages', isAuthenticated, (req, res) => {
  try {
    const { title, content, status, template } = req.body;

    Page.create(
      title,
      content || '',
      status || 'draft',
      req.session.userId,
      template || 'default'
    );

    req.flash('success', 'Page created successfully');
    res.redirect('/admin/pages');
  } catch (err) {
    req.flash('error', 'Error creating page: ' + err.message);
    res.redirect('/admin/pages/new');
  }
});

router.get('/pages/:id/edit', isAuthenticated, (req, res) => {
  const page = Page.getById(req.params.id);
  if (!page) {
    req.flash('error', 'Page not found');
    return res.redirect('/admin/pages');
  }

  res.render('admin/pages/form', {
    title: 'Edit Page',
    page
  });
});

router.put('/pages/:id', isAuthenticated, (req, res) => {
  try {
    const { title, content, status, template } = req.body;

    Page.update(
      req.params.id,
      title,
      content || '',
      status || 'draft',
      template || 'default'
    );

    req.flash('success', 'Page updated successfully');
    res.redirect('/admin/pages');
  } catch (err) {
    req.flash('error', 'Error updating page: ' + err.message);
    res.redirect('/admin/pages/' + req.params.id + '/edit');
  }
});

router.delete('/pages/:id', isAuthenticated, (req, res) => {
  try {
    Page.delete(req.params.id);
    req.flash('success', 'Page deleted successfully');
    res.redirect('/admin/pages');
  } catch (err) {
    req.flash('error', 'Error deleting page: ' + err.message);
    res.redirect('/admin/pages');
  }
});

// Categories routes
router.get('/categories', isAuthenticated, (req, res) => {
  const categories = Category.getAll();
  res.render('admin/categories/index', { title: 'Categories', categories });
});

router.get('/categories/new', isAuthenticated, (req, res) => {
  res.render('admin/categories/form', { title: 'New Category', category: null });
});

router.post('/categories', isAuthenticated, (req, res) => {
  try {
    const { name, description } = req.body;
    Category.create(name, description || '');
    req.flash('success', 'Category created successfully');
    res.redirect('/admin/categories');
  } catch (err) {
    req.flash('error', 'Error creating category: ' + err.message);
    res.redirect('/admin/categories/new');
  }
});

router.get('/categories/:id/edit', isAuthenticated, (req, res) => {
  const category = Category.getById(req.params.id);
  if (!category) {
    req.flash('error', 'Category not found');
    return res.redirect('/admin/categories');
  }
  res.render('admin/categories/form', { title: 'Edit Category', category });
});

router.put('/categories/:id', isAuthenticated, (req, res) => {
  try {
    const { name, description } = req.body;
    Category.update(req.params.id, name, description || '');
    req.flash('success', 'Category updated successfully');
    res.redirect('/admin/categories');
  } catch (err) {
    req.flash('error', 'Error updating category: ' + err.message);
    res.redirect('/admin/categories/' + req.params.id + '/edit');
  }
});

router.delete('/categories/:id', isAuthenticated, (req, res) => {
  try {
    Category.delete(req.params.id);
    req.flash('success', 'Category deleted successfully');
    res.redirect('/admin/categories');
  } catch (err) {
    req.flash('error', 'Error deleting category: ' + err.message);
    res.redirect('/admin/categories');
  }
});

// Tags routes
router.get('/tags', isAuthenticated, (req, res) => {
  const tags = Tag.getAll();
  res.render('admin/tags/index', { title: 'Tags', tags });
});

router.get('/tags/new', isAuthenticated, (req, res) => {
  res.render('admin/tags/form', { title: 'New Tag', tag: null });
});

router.post('/tags', isAuthenticated, (req, res) => {
  try {
    const { name } = req.body;
    Tag.create(name);
    req.flash('success', 'Tag created successfully');
    res.redirect('/admin/tags');
  } catch (err) {
    req.flash('error', 'Error creating tag: ' + err.message);
    res.redirect('/admin/tags/new');
  }
});

router.get('/tags/:id/edit', isAuthenticated, (req, res) => {
  const tag = Tag.getById(req.params.id);
  if (!tag) {
    req.flash('error', 'Tag not found');
    return res.redirect('/admin/tags');
  }
  res.render('admin/tags/form', { title: 'Edit Tag', tag });
});

router.put('/tags/:id', isAuthenticated, (req, res) => {
  try {
    const { name } = req.body;
    Tag.update(req.params.id, name);
    req.flash('success', 'Tag updated successfully');
    res.redirect('/admin/tags');
  } catch (err) {
    req.flash('error', 'Error updating tag: ' + err.message);
    res.redirect('/admin/tags/' + req.params.id + '/edit');
  }
});

router.delete('/tags/:id', isAuthenticated, (req, res) => {
  try {
    Tag.delete(req.params.id);
    req.flash('success', 'Tag deleted successfully');
    res.redirect('/admin/tags');
  } catch (err) {
    req.flash('error', 'Error deleting tag: ' + err.message);
    res.redirect('/admin/tags');
  }
});

// Users routes (admin only)
router.get('/users', isAdmin, (req, res) => {
  const users = User.getAll();
  res.render('admin/users/index', { title: 'Users', users });
});

router.get('/users/new', isAdmin, (req, res) => {
  res.render('admin/users/form', { title: 'New User', editUser: null });
});

router.post('/users', isAdmin, (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    User.create(username, email, password, role || 'user');
    req.flash('success', 'User created successfully');
    res.redirect('/admin/users');
  } catch (err) {
    req.flash('error', 'Error creating user: ' + err.message);
    res.redirect('/admin/users/new');
  }
});

router.get('/users/:id/edit', isAdmin, (req, res) => {
  const editUser = User.getById(req.params.id);
  if (!editUser) {
    req.flash('error', 'User not found');
    return res.redirect('/admin/users');
  }
  res.render('admin/users/form', { title: 'Edit User', editUser });
});

router.put('/users/:id', isAdmin, (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    User.update(req.params.id, username, email, role);

    if (password && password.trim()) {
      User.updatePassword(req.params.id, password);
    }

    req.flash('success', 'User updated successfully');
    res.redirect('/admin/users');
  } catch (err) {
    req.flash('error', 'Error updating user: ' + err.message);
    res.redirect('/admin/users/' + req.params.id + '/edit');
  }
});

router.delete('/users/:id', isAdmin, (req, res) => {
  try {
    if (req.params.id == req.session.userId) {
      req.flash('error', 'You cannot delete your own account');
      return res.redirect('/admin/users');
    }

    User.delete(req.params.id);
    req.flash('success', 'User deleted successfully');
    res.redirect('/admin/users');
  } catch (err) {
    req.flash('error', 'Error deleting user: ' + err.message);
    res.redirect('/admin/users');
  }
});

// Redirect /admin to dashboard
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/admin/login');
  }
});

module.exports = router;
