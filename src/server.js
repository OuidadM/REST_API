import express from 'express';
import helmet from 'helmet';

import mainRoutes from './main.routes.js';
import userRoutes from './users.routes.js';

const PORT=3001;
const app=express();

app.use(express.json());
app.use(helmet());

app.use('/v1',mainRoutes);
app.use('/v1/user',userRoutes);
app.listen(PORT,()=>{
    console.log(`Hey go to http://localhost:${PORT}`);
});