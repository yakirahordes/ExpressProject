var express = require("express");
var router = express.Router();
const fs = require("fs").promises;
const url = require("url");
const path = require("path");

async function getUsersList() {
  try {
    const usersList = await fs.readdir("./public/usersFolders");
    return usersList;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

/* POST users listing. */
router.post("/", async function (req, res, next) {
  const usersList = await getUsersList();
  const currentUser = req.body;
  const checksExistenceOfUser = usersList.includes(currentUser.username);
  res.json(checksExistenceOfUser);
});

router.post("/checkUser", async function (req, res, next) {
  const currentUser = req.body;
  const folderName = path.join(
    __dirname,
    "..",
    `/public/usersFolders/${currentUser.username}`
  );

  try {
    // folder exists?
    const exists = await fs.stat(folderName);
    console.log(exists);
    if (exists) {
      return res.json(false);
    } else {
      await fs.mkdir(folderName);
      return res.json(true); // new user
    }
  } catch (err) {
    await fs.mkdir(folderName);
    return res.json(true); // new user
  }
});

/* GET users data. */
router.get("/:username", async function (req, res, next) {
  const myUrl = req.url.split("/");
  const username = myUrl[myUrl.length - 1];
  console.log("username: ", username);
  const location = path.join(
    __dirname,
    "..",
    `public/usersFolders/${username}`
  );

  try {
    const folderList = await fs.readdir(location);
    res.json(folderList);
  } catch (err) {
    console.error("Error reading directory:", err);
  }
});

module.exports = router;
