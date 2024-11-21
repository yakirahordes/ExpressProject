var express = require("express");
var path = require("path");
var router = express.Router();
var fs = require("fs").promises;

//get files
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

//get files content
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

router.delete(
  "/:username/:foldername/:filename",
  async function (req, res, next) {
    const currentUser = req.params.username;
    const currentFolder = req.params.foldername;
    const currentFile = req.params.filename;

    const filePath = path.join(
      __dirname,
      `../public/usersFolders/${currentUser}/${currentFolder}/${currentFile}`
    );

    const success = await fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.write(false);
      } else {
        console.log("File deleted successfully");
        res.write(true);
      }
    });
    res.json(!success).end();
  }
);

//(Post) add new file
router.post("/:username/:foldername/:filename", async (req, res) => {
  const username = req.body.username;
  const folderName = req.body.foldername;
  const fileName = req.body.filename;
  console.log("fileName: ", fileName);
  console.log("folderName: ", folderName);
  console.log("username: ", username);

  const filePath = path.join(
    __dirname,
    `../public/usersFolders/${username}/${folderName}/${fileName}`
  );
  console.log("filePath: ", filePath);

  try {
    await fs.open(filePath, "a");
    res.json(true);
  } catch {
    res.json(false);
  }
});

//add new file: todo
//delete file: todo
//rename file: todo

module.exports = router;
