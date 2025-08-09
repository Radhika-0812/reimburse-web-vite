# Reimburse Web (Vite + React + Tailwind + RTK Query)

## Dev
```bash
npm i
npm run dev
```

Dev proxy forwards `/api` to `http://localhost:8080` (see `vite.config.js`).

### Expected backend endpoints
- `POST /api/auth/login` → `{ "token": "...", "user": { "id":1,"name":"User","role":"EMPLOYEE" } }`
- `GET /api/reports?mine=true` → pageable list `{ content: [...]}`
- `POST /api/reports` → `{ id: 123, ... }`
- `GET /api/reports/:id` → `{ id, title, status, totalAmount, items:[], receipts:[] }`
- `POST /api/reports/:id/items`
- `POST /api/reports/:id/submit`
- `POST /api/reports/:id/receipts/presign?filename=...` → `{ putUrl }` or `{ url, fields }`
