import express from "express";

const app = express();

app.use(express.json());

//Middleware
const loggingMiddleware = (req, res, next) => {
  console.log(`Method - ${req.method} and Url - ${req.url}`);
  next();
};

// Middleware
const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUser.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

// Register Globally
// app.use(loggingMiddleware);

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
app.get("/", loggingMiddleware, (req, res) => {
  res.status(200).send("Hello, World");
});

// app.get("/api/users", (req, res) => {
//   res.status(200).send(mockUser);
// });

//Route Params
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUser[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

//Query Params
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (!filter && !value) return res.send(mockUser);
  if (filter && value) {
    return res.send(mockUser.filter((user) => user[filter].includes(value)));
  }
});

//Post Request
app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
  mockUser.push(newUser);
  return res.status(201).send(newUser);
});

//Put Request
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex, body } = req;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  res.send(mockUser[findUserIndex]);
});

//Patch Request
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body };
  res.send(mockUser[findUserIndex]);
});

//Delete Request
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUser.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
