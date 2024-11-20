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
  const folderName = `/public/usersFolders/${currentUser.username}`;

  try {
    // Check if the folder already exists (user already exists)
    const exists = await fs
      .access(folderName)
      .then(() => true) // Folder exists
      .catch(() => false); // Folder doesn't exist

    if (exists) {
      return res.json(false); // User already exists
    } else {
      // Create the folder if the user doesn't exist
      await fs.mkdir(folderName);
      return res.json(true); // New user
    }
  } catch (err) {
    console.error(err);
    return res.json(false); // Error occurred
  }
});

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName);
//     res.json(true); //added new folder for new bestie
//   }
// } catch (err) {
//   console.error(err);
//   res.json(false); //existed
// }

// const checksExistenceOfUser = usersList.includes(currentUser.username);
// if (checksExistenceOfUser) {
//   res.send(checksExistenceOfUser);
// } else {
//   res.send(checksExistenceOfUser);

// }

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
