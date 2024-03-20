import runMigrations from "./database/run";
import * as dotenv from "dotenv";

const main = async () => {
  dotenv.config({ path: ".env.local" });
  console.log(process.env.ENVIRONMENT);
  await runMigrations()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
  process.exit();
};

main();
