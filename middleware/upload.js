const storage = require('../config/storage');
const { nanoid } = require('nanoid');

function imageUpload(req, res, next) {
  const bucketName = process.env.BUCKETNAME;

  try {
    
    if (req.file) {
      const {buffer, originalname} = req.file;
      const user = req.loggedUser;
      const bucket = storage.bucket(bucketName);
      let imagePath = '';
      let routePath = req.route.path;

      if (routePath === '/tari/store' || routePath === '/tari/:id') {
        imagePath = `images/tari/${user.id}_${nanoid(8)}_${
          originalname
        }`;
      }else if (routePath === '/user/:id') {
        imagePath = `images/users/${user.id}_${nanoid(8)}_${
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

function imageMultipleUpload(req, res, next) {
  const bucketName = process.env.BUCKETNAME;

  try {
    
    if (req.files.url_gambar || req.files.bukti_pembayaran) {
      const url_gambar =  req.files.url_gambar[0];
      const bukti_pembayaran =  req.files.bukti_pembayaran[0];

      const user = req.loggedUser;
      const bucket = storage.bucket(bucketName);

      let imagePathUrl_gambar = '';
      let imagePathBukti_pembayaran = '';
      let routePath = req.route.path;
      if (routePath === '/workshop' || routePath === '/workshop/:id') {
        imagePathUrl_gambar = `images/workshop/${user.id}_${nanoid(8)}_${
          url_gambar.originalname
        }`;
        imagePathBukti_pembayaran = `images/buktiPembayaran/${user.id}_${nanoid(8)}_${
          bukti_pembayaran.originalname
        }`;
      }else if (routePath === '/workshop/extend' || routePath === '/workshop/extend/:id') {
        imagePathUrl_gambar = `images/workshop/update-${user.id}_${nanoid(8)}_${
          url_gambar.originalname
        }`;
        imagePathBukti_pembayaran = `images/buktiPembayaran/update-${user.id}_${nanoid(8)}_${
          bukti_pembayaran.originalname
        }`;
      }
      bucket.file(imagePathUrl_gambar).save(url_gambar.buffer);
      bucket.file(imagePathBukti_pembayaran).save(bukti_pembayaran.buffer);

      req.body.url_gambar = bucket.file(imagePathUrl_gambar).publicUrl();
      req.body.bukti_pembayaran = bucket.file(imagePathBukti_pembayaran).publicUrl();
    }
    
    next();
  
  } catch (error) {
    next(error);
  }
}


module.exports = { imageUpload, imageMultipleUpload };