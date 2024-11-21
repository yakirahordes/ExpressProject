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
    console.error("error:", err);
  }
}

//post for login
router.post("/", async function (req, res, next) {
  const usersList = await getUsersList();
  const currentUser = req.body;
  console.log("currentUser: ", currentUser);
  const checksExistenceOfUser = usersList.includes(currentUser.username);
  console.log("checksExistenceOfUser: ", checksExistenceOfUser);
  res.json(checksExistenceOfUser);
});

//post for signup
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

// //get folders
// router.get("/:username", async function (req, res, next) {
//   const myUrl = req.url.split("/");
//   const username = myUrl[myUrl.length - 1];
//   const location = path.join(
//     __dirname,
//     "..",
//     `public/usersFolders/${username}`
//   );

//   try {
//     const folderList = await fs.readdir(location);
//     res.json(folderList);
//   } catch (err) {
//     console.error("error:", err);
//   }
// });

module.exports = router;
