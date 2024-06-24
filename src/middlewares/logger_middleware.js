import winston from "winston";

const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logger" },
  transports: [
    new winston.transports.File({
      filename: "logs.txt",
    }),
  ],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("users")) {
    const logData = `Timestamp: ${new Date().toString()}, RequestUrl: ${
      req.url
    }, RequestBody: ${req.body}`;
    await log.info(logData);
  }
  next();
};

export default loggerMiddleware;
