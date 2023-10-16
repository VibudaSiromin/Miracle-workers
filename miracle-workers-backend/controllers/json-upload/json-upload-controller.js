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
    const dataSheet = data[0].map((dataSheet) => {
      const dataSheetName = dataSheet[0];
      const dataSheetType = dataSheetName[dataSheetName.length - 1];
      if (dataSheetType === "E") {
        const newDataSheet = dataSheet;
        newDataSheet.splice(2, 0, [""]);
        return newDataSheet;
      } else {
        return dataSheet
      }
    })
    console.log('Devillllllllllllllllllllllllllllllll', dataSheet);

    await fs.promises.writeFile(launcherFilePath, JSON.stringify(launcher));
    await fs.promises.writeFile(testSuiteFilePath, JSON.stringify(testSuite));
    await fs.promises.writeFile(dataFilePath, JSON.stringify(dataSheet));
    await fs.promises.writeFile(locatorFilePath, JSON.stringify(locators[0]));
    return res.status(200).json({ message: 'File added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error occurred when loading json' });
  }
};

exports.uploadJson = uploadJson;
