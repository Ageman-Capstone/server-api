const storage = require('../config/storage');
const { nanoid } = require('nanoid');

function imageUpload(req, res, next) {
  const bucketName = process.env.BUCKETNAME;

  try {
    const {buffer, originalname} = req.file;
    const user = req.loggedUser;
    const bucket = storage.bucket(bucketName);
    if (req.file) {
      let imagePath = '';
      let routePath = req.route.path;

      if (routePath === '/tari/store' || routePath === '/tari/:id') {
        imagePath = `images/tari/${user.id}_${nanoid(8)}_${
          originalname
        }`;
      } 
      bucket.file(imagePath).save(buffer);
      req.body.url_gambar = bucket.file(imagePath).publicUrl();
    }
    
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { imageUpload };