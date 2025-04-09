import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';

import dbConnect from './helpers/db_connect';
import { errorHandler, noRouteHandler } from './helpers/handlers';
import RSVPRouter from './RSVP/routes/RSVP.routes';

const app = express();
dbConnect();
app.use(cors());
app.use(json());

//Routes

app.use('/api/rsvp', RSVPRouter);

app.use(noRouteHandler);
app.use(errorHandler);

// Export before listen
export default app;

app.listen(3000);
