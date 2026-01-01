import express from 'express';
import api from './routes/api.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/api', api);

app.listen(PORT, () => {
  console.log('server run on port: ', PORT);
});
