const express=require('express');
const router=express.Router();

const commandControllers=require('../../controllers/settings-controllers/commands-controller');
const browserControllers=require('../../controllers/settings-controllers/browsers-controllers')


router.get('/settings/commands',commandControllers.getAllCommands);

router.get('/settings/browsers',browserControllers.getAllBrowsers);

router.get('/settings/commands/:cid',commandControllers.getCommandById);

router.get('/settings/browsers/:bid',browserControllers.getBrowserById);

router.delete('/settings/commands/:cid',commandControllers.deleteCommandById);

router.delete('/settings/browsers/:bid',browserControllers.deleteBrowserById);

router.post('/settings/commands',commandControllers.createdCommand);

module.exports = router;
