// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  req.flash('error', 'Please log in to access this page');
  res.redirect('/admin/login');
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.session && req.session.userId && req.session.userRole === 'admin') {
    return next();
  }
  req.flash('error', 'You do not have permission to access this page');
  res.redirect('/admin/login');
}

// Middleware to redirect if already logged in
function redirectIfAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/admin/dashboard');
  }
  next();
}

module.exports = {
  isAuthenticated,
  isAdmin,
  redirectIfAuthenticated
};
