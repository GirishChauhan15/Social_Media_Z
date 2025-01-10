import app from "./app.js";
import { dbConnect } from "./db/index.js";

let port = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.on("error", (err) => {
      console.log(`Error : ${err.message}`);
    });

    app.listen(port, () => {
      console.log(`Port is running.`);
    });

  })
  .catch((err) => {
    console.log(err.message);
  });
