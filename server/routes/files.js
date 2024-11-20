var express = require("express");
var path = require("path");
var router = express.Router();
var fs = require("fs").promises;

router.get("/:username/:foldername", async function (req, res) {
  const currentUser = req.params.username;
  const currentFolder = req.params.foldername;
  const folderName = path.join(
    __dirname,
    "..",
    `/public/usersFolders/${currentUser}/${currentFolder}`
  );
  const filesList = await fs.readdir(folderName);

  res.json(filesList);
});

router.get("/:username/:foldername/:filename", async function (req, res) {
  const currentUser = req.params.username;
  const currentFolder = req.params.foldername;
  const currentFile = req.params.filename;

  const filePath = path.join(
    __dirname,
    "..",
    `/public/usersFolders/${currentUser}/${currentFolder}/${currentFile}`
  );

  const fileStat = await fs.stat(filePath);

  if (fileStat.isFile()) {
    const fileContent = await fs.readFile(filePath, "utf8");
    res.json({ fileContent });
  }
});

module.exports = router;
