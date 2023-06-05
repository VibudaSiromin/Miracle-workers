const Json = require("../../models/json-models/json");

const uploadJson = async (req, res, next) => {
  try {
    const { file } = req.body;
    const save = new Json({ file: file });
    return res.status(200).json({ message: "File added", data: save });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadJson = uploadJson;
