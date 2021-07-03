import 'module-alias/register';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

require('dotenv').config();

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
