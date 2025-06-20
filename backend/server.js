const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config(); // <-- para ler o .env

const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use('/api', eventRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
