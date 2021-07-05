import 'module-alias/register';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { errorHandler, notFound, Roles } from './middlewares';

import './db';

import APIRoutes from './api';

require('dotenv').config();

const app = express();

interface UserData {
	id: string;
	email: string;
	name: string;
	poin: number;
	role: Roles;
}

// Add token and userData to Request
// So we can call req.token and req.userData
declare global {
	namespace Express {
		export interface Request {
			token: string;
			userData: UserData;
		}
	}
}

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
	res.status(200).send('Hello World');
});

// route "{url}/api"
app.use('/api', APIRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
