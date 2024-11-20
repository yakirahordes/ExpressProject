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

module.exports = router;
