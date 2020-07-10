const express = require('express');
const router = express.Router();




const commentCtrl = require('./controller/comment');


//router.get('/:id', auth, stuffCtrl.getOneThing);
//router.put('/:id', auth, stuffCtrl.modifyThing);
//router.delete('/:id', auth, stuffCtrl.deleteThing);

router.post('/', commentCtrl.createComment);
router.get('/test', commentCtrl.getAllComment);


module.exports = router;