# Redis Mini Project (Backend + TypeScript)

## Project Goal

Learn Redis by building a real backend:

* API with MongoDB
* Redis caching
* Rate limiting
* Cache invalidation

---

# STEP 1: Project Setup

```bash
mkdir redis-mini-project
cd redis-mini-project
npm init -y
git init
```

### Install dependencies

```bash
npm install express mongoose redis dotenv
npm install -D typescript ts-node-dev @types/node @types/express
```

### Init TypeScript

```bash
npx tsc --init
```

---

# Folder Structure

```
src/
 ├── app.ts
 ├── server.ts
 ├── config/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
```

---

# STEP 2: Basic Server

## app.ts

* Express setup
* middleware
* routes

## server.ts

* Start server

Run:

```bash
npm run dev
```

---

# STEP 3: MongoDB Setup

## config/db.ts

* Connect MongoDB

## models/user.model.ts

* Create user schema

---

# STEP 4: User APIs

## controllers/user.controller.ts

* createUser
* getUser

## routes/user.routes.ts

* POST /user
* GET /user/:id

---

# STEP 5: Redis Setup

## Run Redis (Docker)

```bash
docker run -d --name redis -p 6379:6379 redis
```

Check:

```bash
docker ps
```

```bash
docker exec -it redis redis-cli
```

```bash
SET test hello
GET test
```

---

## config/redis.ts

* Create Redis client
* connectRedis()

---

# STEP 6: Redis Caching

## In getUser API:

Flow:

```
Check Redis → If HIT return
Else → Fetch DB → Save in Redis → Return
```

Concepts:

* Cache HIT
* Cache MISS
* TTL (EX: 60)

---

# STEP 7: Cache Invalidation

## updateUser API

* Update DB
* Delete Redis cache

```ts
await client.del(id);
```

---

# STEP 8: Rate Limiting

## middleware/rateLimiter.ts

* Limit requests per IP
* Use Redis INCR + EXPIRE

Apply:

```ts
router.get('/user/:id', rateLimiter, getUser);
```

---

# Testing Flow

1. Create user
2. GET → Cache MISS
3. GET again → Cache HIT
4. Update user → Cache deleted
5. GET → Cache MISS again
6. Hit API multiple times → Rate limit

---

# Docker Commands (Important)

Start Redis:

```bash
docker run -d --name redis -p 6379:6379 redis
```

Check:

```bash
docker ps
```

Stop:

```bash
docker stop redis
```

Remove:

```bash
docker rm -f redis
```

---

# Git Workflow

```bash
git add .
git commit -m "message"
```

Use meaningful commits:

* "Setup server"
* "Add MongoDB"
* "Implement Redis caching"
* "Add rate limiting"

---

# What You Learned

* Backend API development
* Redis caching (HIT/MISS)
* Cache invalidation
* Rate limiting
* Docker basics
* Real-world system flow

---

# Key Concept

```
GET → Cache → DB → Cache
UPDATE → DB → Delete Cache
```

---

# Final Result

You built a **production-like backend system**

