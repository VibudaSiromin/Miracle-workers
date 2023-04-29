const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../../store/launcher.json");

const createLauncher = async (req, res, next) => {
  try {
    const data = req.body;
    const launcherFile = data.data;
    await fs.promises.writeFile(dataFilePath, JSON.stringify(launcherFile));
    res.status(200).json({message:'Created launcher Page'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred when creating launcher" });
  }
};

exports.createLauncher = createLauncher;
