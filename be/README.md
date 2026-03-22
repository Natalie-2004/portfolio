# portfolio-be

Backend service for portfolio contact messages.

## 1) Setup

```bash
cd be
npm install
cp .env.example .env
```

Fill `.env` with your SMTP credentials and target inbox.

## 2) Run locally

```bash
npm run dev
```

Server runs at `http://localhost:8080`.

## 3) Frontend connection

In the frontend `.env.local`, set:

```bash
NEXT_PUBLIC_CONTACT_API_BASE_URL=http://localhost:8080
```

The contact page posts to `POST /api/contact`.
