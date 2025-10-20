import { Router } from 'express';
import Joi from 'joi';

const router = Router();

router.get('/hola', (req, res) => {
  res.json({ mensaje: 'Hola, mundo (seguro)!' });
});

router.post('/echo', (req, res, next) => {
  // Validación de entrada (evita inyecciones/XSS)
  const schema = Joi.object({
    texto: Joi.string().max(200).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(error);
  res.json({ recibido: value });
});

export default router;
