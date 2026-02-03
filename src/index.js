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

//Route Params
app.get("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  }
  const findUser = mockUser.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
