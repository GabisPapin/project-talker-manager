const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const { readTalkers } = require('./helpers/readfile.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_req, res) => {
  const data = await readTalkers();
  res.status(HTTP_OK_STATUS).json(data);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const data = await readTalkers();
  const { id } = req.params;
  const talkerId = data.find((r) => r.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talkerId);
}));

app.listen(PORT, () => {
  console.log('Online');
});
