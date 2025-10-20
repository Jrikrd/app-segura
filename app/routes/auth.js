import { Router } from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Usuario de ejemplo en memoria (para laboratorio)
const demoUser = {
  id: 1,
  email: 'user@example.com',
  // hash de 'Password123!'
  passwordHash: '$2a$10$5Yh9G1o2l6jDgq2l3b9f2uY2Q6T6k2iQn1o3zZg2t8m7q8r9s0tU6'
};

const router = Router();

router.post('/login', (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(error);

  if (value.email !== demoUser.email) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const ok = bcrypt.compareSync(value.password, demoUser.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ sub: demoUser.id, role: 'user' }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1h' });
  res.json({ token });
});

export default router;
