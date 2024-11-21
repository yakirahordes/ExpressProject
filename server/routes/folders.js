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

//(Post) add new folder: todo
router.post("/folders", async (req, res) => {
  try {
    const { username, folderName } = req.body;
    await fs.mkdir(
      path.join(
        __dirname,
        "..",
        `public/usersFolders/${username}/${folderName}`
      )
    );
    res.json({ folderName: folderName });
  } catch {
    console.error("error:", err);
  }
});

//delete folder: todo
//rename folder: todo

module.exports = router;
