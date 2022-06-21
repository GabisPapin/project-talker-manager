const express = require('express');
const rescue = require('express-rescue');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { readTalkers } = require('./helpers/readfile.js');
const { isValidEmail, isValidPassword } = require('./middlewares/validations.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(isValidEmail, isValidPassword);

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

// const isValidToken = (req, res, next) => {
//   const token = req.body.authorization;
//   const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);

//   crypto.randomBytes(token, (err, buf) => {
//     if (err) {
//       console.log(err);
//       return err;
//     }
//     console.log(buf.toString('hex'));
//   });

//   if (!tokenRegex.test(token)) {
//     return res.status(400).json({ message: 'invalid token' });
//   }

//   next();
// };

app.post('/login', (req, res) => {
  const token = req.body.authorization;
  // const { email, password } = req.body;

  crypto.randomBytes(8, (err, buf) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(buf.toString('hex'));
  });

  res.status(HTTP_OK_STATUS).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
