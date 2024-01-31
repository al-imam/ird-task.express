import { app } from "$/app";
import { db } from "$db";

const port = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});
