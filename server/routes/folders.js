var express = require("express");
var router = express.Router();
const fs = require("fs").promises;
const url = require("url");
const path = require("path");

//get folders
router.get("/:username", async function (req, res, next) {
  const myUrl = req.url.split("/");
  const currentUser = req.params.username;
  //   const username = myUrl[myUrl.length - 1];
  const location = path.join(
    __dirname,
    "..",
    `public/usersFolders/${currentUser}`
  );

  try {
    const folderList = await fs.readdir(location);
    console.log(folderList);
    res.json(folderList);
  } catch (err) {
    console.error("error:", err);
  }
});

//(Post) add new folder
router.post("/", async (req, res) => {
  const username = req.body.username;
  const folderName = req.body.foldername;

  const folderPath = path.join(
    __dirname,
    "..",
    `public/usersFolders/${username}/${folderName}`
  );
  try {
    await fs.mkdir(folderPath);
    res.json(true);
  } catch {
    res.json(false);
  }
});

// (Post) rename folder: todo
// router.post("/rename", async (req, res) => {
//   //check
//   const { username, oldFolderName, newFolderName } = req.body;
//   const oldFolderPath = path.join(
//     __dirname,
//     "..",
//     `public/usersFolders/${username}/${oldFolderName}`
//   );
//   const newFolderPath = path.join(
//     __dirname,
//     "..",
//     `public/usersFolders/${username}/${newFolderName}`
//   );
//   try {
//     await fs.rename(oldFolderPath, newFolderPath);
//     res.json(true);
//   } catch (err) {
//     console.error(err);
//     res.json(false);
//   }
// });

module.exports = router;
