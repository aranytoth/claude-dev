const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Page = require('../models/Page');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

// Homepage
router.get('/', (req, res) => {
  const posts = Post.getPublished(10);
  const categories = Category.getAll();
  res.render('public/index', {
    title: 'Home',
    posts,
    categories
  });
});

// Single post
router.get('/post/:slug', (req, res) => {
  const post = Post.getBySlug(req.params.slug);

  if (!post || post.status !== 'published') {
    return res.status(404).render('public/404', { title: 'Post Not Found' });
  }

  const tags = Tag.getPostTags(post.id);

  res.render('public/post', {
    title: post.title,
    post,
    tags
  });
});

// Single page
router.get('/page/:slug', (req, res) => {
  const page = Page.getBySlug(req.params.slug);

  if (!page || page.status !== 'published') {
    return res.status(404).render('public/404', { title: 'Page Not Found' });
  }

  res.render('public/page', {
    title: page.title,
    page
  });
});

// Category archive
router.get('/category/:slug', (req, res) => {
  const category = Category.getBySlug(req.params.slug);

  if (!category) {
    return res.status(404).render('public/404', { title: 'Category Not Found' });
  }

  const posts = Post.getByCategory(category.id);

  res.render('public/category', {
    title: category.name,
    category,
    posts
  });
});

// Tag archive
router.get('/tag/:slug', (req, res) => {
  const tag = Tag.getBySlug(req.params.slug);

  if (!tag) {
    return res.status(404).render('public/404', { title: 'Tag Not Found' });
  }

  const posts = Post.getByTag(tag.id);

  res.render('public/tag', {
    title: tag.name,
    tag,
    posts
  });
});

module.exports = router;
