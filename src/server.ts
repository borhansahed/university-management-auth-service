import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
const port = 5000;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
}

app.listen(config.port, () => {
  console.log(`app listening on port ${port}`);
  main();
});
