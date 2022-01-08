import multer from 'multer';

const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};

  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/');
  }
};

const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: { fileSize: 3000000 },
});

const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: { fileSize: 20000000 },
});

export {
  localMiddleware,
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
  videoUpload,
};
