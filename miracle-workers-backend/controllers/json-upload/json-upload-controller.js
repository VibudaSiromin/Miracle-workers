const Json = require('../../models/json-models/json');
const path = require('path');
const fs = require('fs');
const launcherFilePath = path.join(__dirname, '../../store/launcher.json');
const testSuiteFilePath = path.join(__dirname, '../../store/testSuite.json');
const dataFilePath = path.join(__dirname, '../../store/data.json');
const locatorFilePath = path.join(__dirname, '../../store/locator.json');

const uploadJson = async (req, res, next) => {
  try {
    const { launcher, testSuite, data, locators } = req.body;

    await fs.promises.writeFile(launcherFilePath, JSON.stringify(launcher));
    await fs.promises.writeFile(testSuiteFilePath, JSON.stringify(testSuite));
    await fs.promises.writeFile(dataFilePath, JSON.stringify(data[0]));
    await fs.promises.writeFile(locatorFilePath, JSON.stringify(locators[0]));
    return res.status(200).json({ message: 'File added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error occurred when loading json' });
  }
};

exports.uploadJson = uploadJson;
