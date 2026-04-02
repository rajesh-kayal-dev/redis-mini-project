# Redis Mini Project (Backend + TypeScript)

## Project Goal
Learn Redis by building a real backend system with:
- MongoDB API
- Redis caching
- Rate limiting
- Cache invalidation

---

## Project Setup

### Initialize Project
```bash
mkdir redis-mini-project
cd redis-mini-project
npm init -y
git init
```

### Install Dependencies
```bash
npm install express mongoose redis dotenv
npm install -D typescript ts-node-dev @types/node @types/express
```

### Add Script (package.json)
```json
"dev": "nodemon --exec ts-node src/server.ts"
```

### Initialize TypeScript
```bash
npx tsc --init
```

---

## Folder Structure
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

## Basic Server Setup

### app.ts
- Setup Express
- Add middleware
- Register routes

### server.ts
- Start server

### Run Server
```bash
npm run dev
```

---

## MongoDB Setup

### config/db.ts
- Connect MongoDB

### models/user.model.ts
- Create user schema

---

## User APIs

### controllers/user.controller.ts
- createUser
- getUser

### routes/user.routes.ts
- POST /user
- GET /user/:id

---

## Redis Setup

### Run Redis using Docker
```bash
docker run -d --name redis -p 6379:6379 redis
```

### Verify Container
```bash
docker ps
```

### Open Redis CLI
```bash
docker exec -it redis redis-cli
```

### Test Redis
```bash
SET test hello
GET test
```

---

## Redis Configuration

### config/redis.ts
- Create Redis client
- Implement connectRedis()

---

## Redis Caching

### getUser API Flow
```
Check Redis → If HIT return data
Else → Fetch from DB → Store in Redis → Return data
```

### Concepts
- Cache HIT
- Cache MISS
- TTL (example: 60 seconds)

---

## Cache Invalidation

### updateUser API
- Update data in DB
- Delete cache from Redis

```ts
await client.del(id);
```

---

## Rate Limiting

### middleware/rateLimiter.ts
- Limit requests per IP
- Use Redis INCR and EXPIRE

### Apply Middleware
```ts
router.get('/user/:id', rateLimiter, getUser);
```

---

## Testing Flow

1. Create user  
2. First GET → Cache MISS  
3. Second GET → Cache HIT  
4. Update user → Cache deleted  
5. GET again → Cache MISS  
6. Multiple requests → Rate limiting triggered  

---

## Docker Commands

### Start Redis
```bash
docker run -d --name redis -p 6379:6379 redis
```

### Check Running Containers
```bash
docker ps
```

### Stop Redis
```bash
docker stop redis
```

### Remove Redis
```bash
docker rm -f redis
```

---

## Git Workflow

```bash
git add .
git commit -m "message"
```

### Example Commit Messages
- Setup server
- Add MongoDB
- Implement Redis caching
- Add rate limiting

---

## Key Concept

```
GET → Cache → DB → Cache
UPDATE → DB → Delete Cache
```

---

## What You Learned

- Backend API development
- Redis caching (HIT/MISS)
- Cache invalidation
- Rate limiting
- Docker basics
- Real-world backend flow

---

## Final Result

You built a production-like backend system using Redis, MongoDB, and TypeScript.