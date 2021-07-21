import winston from 'winston';
import path from 'path';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.resolve('./logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.resolve('./logs/combined.log'),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
