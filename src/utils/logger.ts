import { createLogger, format, Logger, transports } from "winston";
import "winston-daily-rotate-file";
import { LOG_LEVEL } from "../config/config";

const alignedWithColorsAndTime = (label: string) =>
  format.combine(
    format.errors({ stack: true }),
    format.label({ label }),
    format.timestamp(),
    format.json(),
  );

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const loggers: { [name: string]: Logger } = {};

const getLogger = (label: string): Logger => {
  if (loggers[label]) {
    return loggers[label];
  }

  const logger = createLogger({
    level: LOG_LEVEL || "info",
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.json(),
    ),
    transports: [fileRotateTransport],
  });

  logger.add(
    new transports.Console({
      format: alignedWithColorsAndTime(label),
    }),
  );

  loggers[label] = logger;
  return logger;
};

export default getLogger;
