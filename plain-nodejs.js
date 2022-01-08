const fs = require("fs");
const http = require("http");

// PART 1: Writing to a file
const dateObject = new Date();
const date = dateObject.getDate();
const month = dateObject.getMonth() + 1;
const year = dateObject.getFullYear();
const timeStamp = `${date}-${month}-${year}`;
const currentTime = dateObject.getTime();

fs.writeFileSync(`./files/${timeStamp}_${currentTime}`,
  `${timeStamp}: Writing to a file using NodeJS...`, (err) => {
    if (err) {
      console.log("Error while writing to the file:", err);
    }

    console.log("Write successful!");
  });

// PART 2: Creating an HTTP server and download the files
const PORT = 5000;
http.createServer((req, res) => {
  if (req.url === `./files/${timeStamp}` && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write("Welcome to NodeJS 101!");
    res.download()
    res.end();
  } else if (req.url === "/api/download" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.download("./assets/pack.zip");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
