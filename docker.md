# 🚀 Redis Mini Project Guide

## 🟢 Start Project

```bash
docker-compose up
```

---

## 🛑 Stop Project

```bash
docker-compose down
```

---

## 🔄 Restart Project

```bash
docker-compose up
```

---

## 🔨 Rebuild Project (code change)

```bash
docker-compose up --build
```

---

## 🧹 Clean Reset (Fix Errors)

```bash
docker-compose down -v
docker-compose up --build
```

---

## 📊 View Logs

### Only Backend Logs
```bash
docker-compose logs -f app
```

---

## 🧪 Test API

Open browser or Postman:

```
http://localhost:5000
```

---

## ⚡ Redis Testing

- First request → Cache MISS
- Second request → Cache HIT

---

## 🧠 Important Notes

- Use `redis://redis:6379` inside Docker
- Use `mongodb://mongo:27017/...` inside Docker
- Never use `localhost` inside containers

---

## 🐳 Services

- App → Port 5000
- Mongo → Port 27017
- Redis → Port 6379

---

## ✅ Success Output

```
MongoDB connected
Redis connected
Server running on port 5000
```