# Redis Mini Project Guide

## Overview
This project demonstrates:
- Redis caching (HIT/MISS)
- Cache invalidation
- Background jobs using BullMQ
- Docker-based multi-service setup

---

## Project Architecture
- App (Node.js API)
- Worker (BullMQ background processor)
- Redis (Queue + Cache)
- MongoDB (Database)

---

## Flow
API → Queue → Worker → Job processed

---

## Prerequisites
- Docker installed
- Docker Compose installed

---

## Commands

### Start Project
```bash
docker-compose up
```

### Stop Project
```bash
docker-compose down
```

### Restart Project
```bash
docker-compose down
docker-compose up
```

### Rebuild Project
```bash
docker-compose up --build
```

### Clean Reset
```bash
docker-compose down -v
docker-compose up --build
```

---

## Logs

### Backend Logs
```bash
docker-compose logs -f app
```

### Worker Logs
```bash
docker-compose logs -f worker
```

### All Logs
```bash
docker-compose logs -f
```

---

## API Testing

```
http://localhost:5000/api/user
```

### Example POST Request
```json
{
  "name": "Rajesh",
  "email": "rajesh@gmail.com"
}
```

---

## Redis Cache Testing
- First request → Cache MISS (data from DB)
- Second request → Cache HIT (data from Redis)

---

## Configuration

### MongoDB
```
mongodb://mongo:27017/redis-demo
```

### Redis
```
redis://redis:6379
```

Note: Do not use `localhost` inside Docker containers. Use service names like `mongo` and `redis`.

---

## Ports
- App → 5000
- MongoDB → 27017
- Redis → 6379

---

## Expected Logs

### App
- MongoDB connected
- Redis connected
- Server running on port 5000
- Job added to queue

### Worker
- Worker started
- Processing job: sendEmail
- Email sent

---

## Common Issues

### Port Already in Use
```
port already allocated
```

Solution:
```bash
docker-compose down
```

---

### Redis or Mongo Not Connecting
- Check containers are running: `docker ps`
- Use correct hostnames: `redis`, `mongo`

---

### Worker Not Processing Jobs
- Check worker container is running
- Check queue connection
- Check job is being added from API

---

## Development Notes
- Cache uses TTL (`setEx`)
- Cache invalidated on create/update/delete
- BullMQ handles background jobs
- Worker runs separately from API