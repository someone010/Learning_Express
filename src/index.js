import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
  { id: 1, userName: "Jyoti", displayName: "Kanha" },
  { id: 2, userName: "Hitesh", displayName: "Hit" },
  { id: 3, userName: "Atiqur", displayName: "Atiq" },
  { id: 4, userName: "Amit", displayName: "Amit" },
  { id: 5, userName: "Ashish", displayName: "Nandu" },
  { id: 6, userName: "Piyush", displayName: "Bunty" },
  { id: 7, userName: "Hinderson", displayName: "Hind" },
  { id: 8, userName: "Topper", displayName: "Top" },
];

//Get Request
app.get("/", (req, res) => {
  res.status(200).send("Hello, World");
});

app.get("/api/users", (req, res) => {
  res.status(200).send(mockUser);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
