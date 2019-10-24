const pino = require("pino");
const data = require("./data.json");

const delay = process.env.LOG_DELAY || 3000;

const logger = pino({
  messageKey: "message",
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
});

const timer = ms => new Promise(res => setTimeout(res, ms));

const log = async data => {
  let counter = 0;
  const dataSize = data.length;

  while (counter < dataSize) {
    const rec = data[counter];
    console.log("This is a string log that we want to confuse people");
    const message = `Logging information for ${rec.first_name} ${rec.last_name}`;
    if (counter / 2 == 0) {
      logger.warn(rec, message);
    } else {
      logger.info(rec, message);
    }
    await timer(delay);
    if (counter == dataSize - 1) {
      counter = 0;
    } else {
      counter++;
    }
  }
};

log(data);
