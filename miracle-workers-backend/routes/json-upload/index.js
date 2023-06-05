const express=require('express');
const router=express.Router();

const jsonUploadControllers=require('../../controllers/json-upload/json-upload-controller');

router.post('/upload',jsonUploadControllers.uploadJson);

module.exports = router;
