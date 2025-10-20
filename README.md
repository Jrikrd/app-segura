# Segura App (Starter)

Proyecto mínimo para practicar **implementación segura de aplicaciones** con:
- Express + Helmet + Rate Limit + Validación
- Pruebas (Jest)
- Linting (ESLint)
- Auditoría de dependencias (npm audit)
- Contenedor Docker + docker-compose
- Pipeline de GitHub Actions con **OWASP ZAP baseline**

## Uso rápido
```bash
cp .env.example .env
npm ci
npm run dev
# GET http://localhost:3000/health
```

### Docker
```bash
docker compose up --build -d
curl http://localhost:3000/health
```

### Pruebas
```bash
npm test
```
