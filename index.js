const path = require("node:path");
const express = require("express");
const app = express();
const port = 9000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// database
let bookDatabase = [];

// route section
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

app.get("/books", (req, res) => {
  res.send(bookDatabase);
});

app.post("/books", (req, res) => {
  const userData = req.body;

  if (userData.title && userData.author) {
    const data = {
      id: bookDatabase.length + 1,
      ...userData,
    };
    bookDatabase.push(data);
    res.status(201).json({
      message: "success",
      data: {
        ...data,
      },
    });
  } else {
    res.status(500).json({
      message: "invalid title or author name",
    });
  }
});

app.delete("/books/:id", (req, res) => {
  const userId = req.params.id;

  if (userId) {
    const a = bookDatabase.filter((book) => book.id != book.userId);
    console.log(a);
    res.status(200).json({
      message: "successfully delete",
    });
  } else {
    res.status(500).json({
      message: "unsuccessfully request",
    });
  }
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
