
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { musicsRouter } from './routes/musicsRouter.js'; 


const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api', musicsRouter); 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


