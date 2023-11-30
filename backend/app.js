const express = require("express");
const users = require("./users");
const diary = require("./diarymessages");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/users", users);
app.use("/messages", diary);

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});

export default app;
