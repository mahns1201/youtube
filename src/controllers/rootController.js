import Video from '../models/Video';

const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: 'desc' });

  return res.render('home', { pageTitle: 'Home', videos });
};

export { home };
