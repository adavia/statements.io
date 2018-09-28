import winston from 'winston';

const logger = winston.createLogger({
	transports: [
		new (winston.transports.File)({
			level: 'debug',
			json: true,
			filename: './src/logs/debug.log',
			handleExceptions: true
		}),
		new (winston.transports.Console)({
			level: 'debug',
			json: true,
			handleExceptions: true
		})
	],
	exitOnError: false
});

export default logger;