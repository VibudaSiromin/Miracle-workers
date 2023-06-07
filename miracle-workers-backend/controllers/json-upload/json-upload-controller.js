const Json = require("../../models/json-models/json");
const path = require("path");
const fs = require("fs");
const launcherFilePath = path.join(__dirname, "../../store/launcher.json");
const testSuiteFilePath = path.join(__dirname, "../../store/testSuite.json");

const uploadJson = async (req, res, next) => {
  try {
    const { launcher, testSuite } = req.body;
    console.log(1111111);
    await fs.promises.writeFile(launcherFilePath, JSON.stringify(launcher));
    await fs.promises.writeFile(testSuiteFilePath, JSON.stringify(testSuite));
    return res.status(200).json({ message: "File added" });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadJson = uploadJson;
