const express=require('express');
const router=express.Router();

const commandControllers=require('../../controllers/settings-controllers/commands-controller');
const browserControllers=require('../../controllers/settings-controllers/browsers-controllers');
const conditionControllers=require('../../controllers/settings-controllers/conditions-controllers');
const instructionControllers=require('../../controllers/settings-controllers/instructions-controllers')
const statusControllers=require('../../controllers/settings-controllers/status-controllers')
const testTypeControllers=require('../../controllers/settings-controllers/testType-controllers')

//routes for load all setting items

router.get('/settings/commands',commandControllers.getAllCommands);

router.get('/settings/browsers',browserControllers.getAllBrowsers);

router.get('/settings/test-types',testTypeControllers.getAllTestTypes);

router.get('/settings/status',statusControllers.getAllStatus);

router.get('/settings/instructions',instructionControllers.getAllInstructions);

router.get('/settings/conditions',conditionControllers.getAllConditions);

//routes for get setting item by ID

router.get('/settings/commands/:cid',commandControllers.getCommandById);

router.get('/settings/browsers/:bid',browserControllers.getBrowserById);

router.get('/settings/test-types/:tid',testTypeControllers.getTestTypeById);

router.get('/settings/instructions/:insid',instructionControllers.getInstructionById);

router.get('/settings/status/:sid',statusControllers.getStatusById);

router.get('/settings/conditions/:conid',conditionControllers.getConditionById);

//routes for delete setting item by ID

router.delete('/settings/commands/:cid',commandControllers.deleteCommandById);

router.delete('/settings/browsers/:bid',browserControllers.deleteBrowserById);

router.delete('/settings/test-types/:tid',testTypeControllers.deleteTestTypeById);

router.delete('/settings/instructions/:insid',instructionControllers.deleteInstructionId);

router.delete('/settings/status/:sid',statusControllers.deleteStatusById);

router.delete('/settings/conditions/:conid',conditionControllers.deleteConditionById);

//routes for create new setting item

router.post('/settings/commands',commandControllers.createdCommand);

router.post('/settings/browsers',browserControllers.createdBrowser);

router.post('/settings/test-types',testTypeControllers.createdTestType);

router.post('/settings/status',statusControllers.createdStatus);

router.post('/settings/instructions',instructionControllers.createdInstruction);

router.post('/settings/conditions',conditionControllers.createdCondition);

//routes for edit existing setting item

router.put('/settings/commands/:cid',commandControllers.editedCommand);

router.put('/settings/browsers/:bid',browserControllers.editedBrowser);

// router.post('/settings/test-types',testTypeControllers.editedTestType);

// router.post('/settings/status',statusControllers.editedStatus);

router.put('/settings/instructions/:insid',instructionControllers.editedInstruction);

router.put('/settings/conditions/:conid',conditionControllers.editedCondition);

module.exports = router;
