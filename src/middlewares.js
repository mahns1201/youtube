import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multerUploader = multerS3({
  s3,
  bucket: 'mahns-youtube',
  acl: 'public-read',
});

const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};

  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Log in first');
    return res.redirect('/login');
  }
};

const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/');
  }
};

const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: { fileSize: 3000000 },
  storage: multerUploader,
});

const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: { fileSize: 20000000 },
  storage: multerUploader,
});

export {
  localMiddleware,
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
  videoUpload,
};
