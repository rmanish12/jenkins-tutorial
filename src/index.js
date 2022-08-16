const app = require("./app");
const { PORT } = require("./env");

const logger = require("./logger");

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
