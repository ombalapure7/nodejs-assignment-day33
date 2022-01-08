const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const zipper = require('zip-local');
require("dotenv").config();

const port = process.env.PORT || 5000;
const absPath = path.join(__dirname, './assets');

/**
 * @desc  PART 2: Creating an HTTP server and download the files
 */
app.get("/", (req, res) => {
  res.send(`
    <h1>Guvi NodeJS Task - Session 33</h1>
    <h4>REST Endpoints</h4>
    <p>/create: Creates a file under the <strong>assets/</strong> directory</p>
    <p>/download: Compresses and download files under the <strong>assets/</strong> directory</p>
    <a href="/download">Download</a> | <a href="/create">Create</a>
  `);
});

/**
 * @desc  PART 1: Creating a file with time-stamp name and writing to it
 */
app.get("/create", (req, res) => {
  const dateObject = new Date();
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const timeStamp = `${date}-${month}-${year}`;
  const currentTime = dateObject.getTime();

  fs.writeFileSync(`${absPath}/${timeStamp}_${currentTime}`,
    `${timeStamp}: Writing to a file using NodeJS...`, (err) => {
      if (err) {
        console.log("Error while writing to the file:", err);
        res.send("Error while writing to the file");
      }
    });

  let files = "";
  fs.readdirSync(`${absPath}`).forEach(file => {
    files += file + "<br>";
  });

  res.send(`
    <h1>Guvi NodeJS Task - Session 33</h1>
    <h2>List of files created so far</h2>
    <p>${files}</p>
    <p><em>Refresh the page to create files</em></p>
    <a href="/">Home</a>
  `);
});

app.get('/download', (req, res) => {
  // Compress all the files under assets/
  console.log("ABS PATH:", absPath);

  zipper.sync.zip("./assets/").compress().save(`${absPath}/pack.zip`);
  // Download the zipped file
  res.download("./assets/pack.zip");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
