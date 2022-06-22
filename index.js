const express = require('express');
const rescue = require('express-rescue');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { readTalkers } = require('./helpers/readfile.js');
const { writeTalkers } = require('./helpers/writefile.js');
const { 
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
 } = require('./middlewares/validations.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', rescue(async (req, res) => {
  const data = await readTalkers();
  const { id } = req.params;
  const talkerId = data.find((r) => r.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(HTTP_OK_STATUS).json(talkerId);
}));

app.get('/talker', rescue(async (_req, res) => {
  const data = await readTalkers();
  return res.status(HTTP_OK_STATUS).json(data);
}));

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', isValidToken, isValidName, isValidAge, isValidTalk, 
isValidRate, isValidWatchedAt, rescue(async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const data = await readTalkers();
  
  const newTalker = { id: data.length + 1, name, age, talk: { watchedAt, rate } };
  
  data.push(newTalker);

  await writeTalkers(data);

  return res.status(201).json(newTalker);
}));

app.put('/talker/:id', isValidToken, isValidName, isValidAge, isValidTalk,
isValidRate, isValidWatchedAt, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const data = await readTalkers();

  const talkerIndex = data.findIndex((r) => r.id === Number(id));

  const talkerEdit = { ...data[talkerIndex], name, age, talk: { watchedAt, rate } };

  data[talkerIndex] = talkerEdit;

  await writeTalkers(data);

  return res.status(HTTP_OK_STATUS).json(talkerEdit);
}));

app.delete('/talker/:id', isValidToken, rescue(async (req, res) => {
  const { id } = req.params;
  const data = await readTalkers();

  const talkerIndex = data.findIndex((r) => r.id === Number(id));

  const talkerDel = data.splice(talkerIndex, 1);

  data[talkerIndex] = talkerDel;

  await writeTalkers(data);

  return res.status(204).end();
}));

app.listen(PORT, () => {
  console.log('Online');
});
