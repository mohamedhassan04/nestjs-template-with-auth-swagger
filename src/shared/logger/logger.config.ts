import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import {
  blue,
  red,
  yellow,
  cyan,
  green,
  magenta,
  italic,
  yellowBright,
} from 'colorette';

const colorizeLevel = (level: string) => {
  switch (level) {
    case 'error':
      return red(level);
    case 'warn':
      return yellow(level);
    case 'info':
      return cyan(level);
    case 'debug':
      return green(level);
    case 'verbose':
      return magenta(level);
    default:
      return level;
  }
};

let alignColorsAndTime = winston.format.combine(
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => {
    const coloredTimestamp = italic(cyan(`[${info.timestamp}]`));
    const coloredLevel = italic(blue(`[${info.level}]`));
    const coloredMessage = italic(yellowBright(info.message));

    return `${coloredTimestamp}  ${coloredLevel} ${coloredMessage}`;
  }),
);

// Create the logger instance
export const winstonLogger = WinstonModule.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: alignColorsAndTime,
    }),
  ],
});
