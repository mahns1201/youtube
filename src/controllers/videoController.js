import Video from '../models/Video';
import User from '../models/User';

const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner');

  if (!video) {
    return res.status(400).render('404', { pageTitle: 'Video not found' });
  }

  return res.render('watch', { pageTitle: 'watch', video });
};

const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'upload' });
};

const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });

    const user = await User.findById(_id);

    user.videos.push(newVideo._id);
    user.save();

    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render('upload', { pageTitle: 'upload', errorMessage: error._message });
  }
};

const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  const {
    user: { _id },
  } = req.session;

  if (!video) {
    return res.status(400).render('404', { pageTitle: 'Video not found' });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }

  return res.render('edit', { pageTitle: 'Editing', video });
};

const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.status(400).render('404', { pageTitle: 'Video not found' });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }

  await Video.findByIdAndDelete(id);

  return res.redirect('/');
};

const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, 'i'),
      },
    });
  }

  return res.render('search', { pageTitle: 'Search', videos });
};

const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
  search,
  registerView,
};
