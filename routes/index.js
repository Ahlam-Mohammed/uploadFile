const { Router } = require('express');
const path = require('path');
const User = require('./../models/user');
const upload = require('../middlewares/upload');
const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index');
});

const userFilesHandler = upload.fields([
  {
    name: 'img',
    maxCount: 1,
  },
  {
    name: 'cv',
    maxCount: 1,
  },
]);

router.post('/add_user', userFilesHandler, async (req, res) => {
  try {
    const { username, email } = req.body;
    const { img , cv } = req.files;

    await User.insertMany({
      username,
      email,
      img: img[0].path,
      cv: cv[0].path,
    });

    res.send('Done ...');
  } catch (err) {
    console.log(err.writeErrors);
    res.json(err.writeErrors[0].errmsg);
  }
});

module.exports = router;
