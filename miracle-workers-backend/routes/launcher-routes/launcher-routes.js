const express=require('express');
const router=express.Router();

const launcherControllers=require('../../controllers/launcher-controllers/launcher');


//route for editing laoncher page
router.post('/testJunction/testManual/:tname/editLauncher',launcherControllers.editTestPage);
//route for creating a launcher page
router.post('/launcher/createLauncherPage',launcherControllers.createLauncherPage);
//router.get('/testJunction/testManual/:tname/getLauncherContent',launcherControllers.getLauncherContent);
router.get('/launcher/getLauncherContent',launcherControllers.getLauncherContent);
//route for getting refered data pages
router.get('/launcher/getReferedDataPages',launcherControllers.getReferedDataPages);
//route for getting all launcher data
router.get('/launcher/getAllLauncherData',launcherControllers.getAllLauncherData);
//route for launcher page
router.post('/launcher', launcherControllers.createLauncher);
//route for deleting test page name in launcher
router.delete('/launcher/deleteTestPageName', launcherControllers.deleteTestPageInLauncher);
//route for renaming test page name in launcher
router.patch('/launcher/renamePageName',launcherControllers.renameTestPageNameInLauncher);

module.exports = router;
