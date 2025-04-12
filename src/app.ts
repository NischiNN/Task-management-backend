import * as express from 'express';
import apiRoutes from './routes/router';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import network from './config/network';
import * as bodyParser from 'body-parser';

const app = express();

const allowedDomains = [network.FRONTEND_URL, 'http://localhost:4200'];

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  cors({
    credentials: true,
    exposedHeaders: [
      'Authorization',
      'authorization',
      'X-Annotations',
      'x-session-id',
    ],
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (!allowedDomains.includes(origin)) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        callback(new Error(msg), false);
        return;
      }
      callback(null, true);
    },
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  '*',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`Quering route ${req.method} -- ${req.originalUrl}`);
    next();
  }
);

app.set('trust proxy', 1);

app.use('/api', apiRoutes);

export default app;
