# Redis Setup Guide

## Connection Details

- **Host**: `localhost` (local) / `cache` (Docker network)
- **Port**: `6379`
- **Username**: `redisuser`
- **Password**: `redispassword`
- **Connection String**: `redis://redisuser:redispassword@localhost:6379`

## Local Development Access

### Using Docker Exec (Recommended)

Connect to Redis CLI directly from the container:

```bash
docker exec -it nestjs-redis redis-cli -u redis://redisuser:redispassword@localhost:6379
```

### Using Redis CLI from Host Machine

If you have Redis CLI installed locally:

```bash
redis-cli -u redis://redisuser:redispassword@localhost:6379
```

Or using individual parameters:

```bash
redis-cli -h localhost -p 6379 --user redisuser --pass redispassword
```

## Production Access

### From Application

Your NestJS application connects using environment variables:

- `REDIS_HOST` - Redis server hostname
- `REDIS_PORT` - Redis server port (default: 6379)
- `REDIS_USERNAME` - Redis username
- `REDIS_PASSWORD` - Redis password

### From Server/Container

If Redis is running in a container or on a remote server:

```bash
# From another container on the same Docker network
redis-cli -h cache -p 6379 --user redisuser --pass redispassword

# From remote server
redis-cli -h <redis-host> -p 6379 --user redisuser --pass redispassword
```

## Common Redis CLI Commands

Once connected to Redis CLI, you can use these commands:

### Basic Operations

```redis
# Test connection
PING
# Response: PONG

# Get all keys (use with caution in production)
KEYS *

# Get keys matching a pattern
KEYS user:*

# Check if key exists
EXISTS keyname

# Get value by key
GET keyname

# Set a key-value pair
SET keyname "value"

# Set with expiration (in seconds)
SET keyname "value" EX 3600

# Delete a key
DEL keyname

# Get all keys (safer alternative to KEYS *)
SCAN 0 MATCH pattern:* COUNT 100
```

### Hash Operations

```redis
# Set hash field
HSET user:1 name "John" email "john@example.com"

# Get hash field
HGET user:1 name

# Get all hash fields
HGETALL user:1

# Delete hash field
HDEL user:1 email
```

### List Operations

```redis
# Add to list (left)
LPUSH mylist "item1"

# Add to list (right)
RPUSH mylist "item2"

# Get list length
LLEN mylist

# Get list items
LRANGE mylist 0 -1

# Remove from list
LPOP mylist
```

### Set Operations

```redis
# Add to set
SADD myset "member1"

# Get all set members
SMEMBERS myset

# Check if member exists
SISMEMBER myset "member1"

# Remove from set
SREM myset "member1"
```

### Database Management

```redis
# Select database (0-15)
SELECT 0

# Get database size
DBSIZE

# Flush current database (use with caution!)
FLUSHDB

# Flush all databases (use with extreme caution!)
FLUSHALL

# Get server info
INFO

# Get memory usage
INFO memory
```

### Authentication & ACL

```redis
# Authenticate (if not using connection string)
AUTH redisuser redispassword

# List all ACL users
ACL LIST

# Get current user info
ACL WHOAMI
```

## Environment Variables

Make sure these are set in your `.env` file:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=redisuser
REDIS_PASSWORD=redispassword
```

## Docker Commands

```bash
# Start Redis
docker compose up -d cache

# Stop Redis
docker compose stop cache

# View Redis logs
docker logs nestjs-redis

# Restart Redis
docker compose restart cache
```

## Security Notes

- **Local Development**: Uses `redisuser` / `redispassword` (change for production!)
- **Production**: Use strong passwords and store them securely
- **Network**: Redis is exposed on port 6379 - restrict access in production
- **ACL**: Default user is disabled, only `redisuser` has access
