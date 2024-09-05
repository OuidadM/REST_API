import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import mainRoutes from './main.routes.js';
import userRoutes from './users.routes.js';
import compression from 'compression';

const PORT=3001;

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute).
})


const app=express();

app.use(compression())
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json());
app.use(helmet());

app.use('/v1',mainRoutes);
app.use('/v1/user',userRoutes);
app.listen(PORT,()=>{
    console.log(`Hey go to http://localhost:${PORT}`);
});