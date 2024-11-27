import isEmpty from "lodash.isempty";
import pino from "pino";

export const rootLogger = pino({
  level: "trace",
  enabled: process.env.NODE_ENV === "development",
  browser: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    write(object: any) {
      const { level, name, msg, ...data } = object;

      let str = `[${getLevelName(level)}]`;

      if (name) {
        str += ` ${name}:`;
      }

      str += ` ${msg}`;

      getConsoleMethod(level)(str, ...(isEmpty(data) ? [] : [data]));
    },
  },
});

/**
 * @deprecated Use `rootLogger` instead.
 */
export const logger = rootLogger;

function getConsoleMethod(level: number) {
  switch (level) {
    case 10:
      return console.debug;
    case 20:
      return console.debug;
    case 30:
      return console.log;
    case 40:
      return console.warn;
    case 50:
      return console.error;
    default:
      return console.log;
  }
}

function getLevelName(level: number) {
  switch (level) {
    case 10:
      return "TRACE";
    case 20:
      return "DEBUG";
    case 30:
      return "INFO";
    case 40:
      return "WARN";
    case 50:
      return "ERROR";
    default:
      return "INFO";
  }
}
