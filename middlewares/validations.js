// const crypto = require('crypto');

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

const isValidToken = (req, res, next) => {
  // const token = crypto.randomBytes(8).toString('hex');
  const { authorization } = req.headers;
  // const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  return next();
};

const isValidWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dataRegex = new RegExp(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/gm,
  );

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

  if (!dataRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  return next();
};

const isValidRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  
  return next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
};