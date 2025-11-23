# 🐳 Docker Guide - Backend

## 📦 Files đã tạo sẵn

- ✅ `Dockerfile` - Production build (optimized)
- ✅ `Dockerfile.dev` - Development build (hot reload)
- ✅ `docker-compose.yml` - Production stack
- ✅ `docker-compose.dev.yml` - Development stack
- ✅ `.dockerignore` - Ignore files

---

## 🚀 Quick Start

### Production:

```bash
cd backend

# Build image
docker build -t blockchain-apps-backend .

# Run container
docker run -p 5000:8080 \
  -e ETHERSCAN_API_KEY=your_key \
  -e ZAN_API_KEY=your_key \
  -e ZAN_API_URL=your_url \
  -e COINMARKETCAP_API_KEY=your_key \
  blockchain-apps-backend

# Or use docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Development:

```bash
cd backend

# Run with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild
docker-compose -f docker-compose.dev.yml up --build

# Stop
docker-compose -f docker-compose.dev.yml down
```

---

## 🔧 Docker Commands

### Build:

```bash
# Build production image
docker build -t blockchain-apps-backend:latest .

# Build development image
docker build -f Dockerfile.dev -t blockchain-apps-backend:dev .

# Build with no cache
docker build --no-cache -t blockchain-apps-backend .

# Build for specific platform
docker build --platform linux/amd64 -t blockchain-apps-backend .
```

### Run:

```bash
# Run production
docker run -d \
  --name blockchain-backend \
  -p 5000:8080 \
  --env-file .env \
  blockchain-apps-backend

# Run development
docker run -d \
  --name blockchain-backend-dev \
  -p 5000:8080 \
  -v $(pwd)/src:/app/src \
  --env-file .env \
  blockchain-apps-backend:dev

# Run with custom port
docker run -p 3000:8080 blockchain-apps-backend

# Run interactive
docker run -it blockchain-apps-backend sh
```

### Manage:

```bash
# List containers
docker ps

# Stop container
docker stop blockchain-backend

# Start container
docker start blockchain-backend

# Remove container
docker rm blockchain-backend

# View logs
docker logs blockchain-backend

# Follow logs
docker logs -f blockchain-backend

# Execute command
docker exec blockchain-backend npm --version

# Shell into container
docker exec -it blockchain-backend sh
```

### Images:

```bash
# List images
docker images

# Remove image
docker rmi blockchain-apps-backend

# Tag image
docker tag blockchain-apps-backend:latest blockchain-apps-backend:v1.0.0

# Push to registry
docker push your-username/blockchain-apps-backend

# Pull from registry
docker pull your-username/blockchain-apps-backend
```

---

## 🐳 Docker Compose Commands

### Basic:

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f backend

# List services
docker-compose ps
```

### Advanced:

```bash
# Scale services
docker-compose up -d --scale backend=3

# Execute command
docker-compose exec backend npm run test

# Shell into service
docker-compose exec backend sh

# View config
docker-compose config

# Validate config
docker-compose config --quiet
```

---

## 🌐 Environment Variables

### .env file:

```bash
# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
PORT=8080
ETHERSCAN_API_KEY=your_etherscan_key
ZAN_API_KEY=your_zan_key
ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
COINMARKETCAP_API_KEY=your_coinmarketcap_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
```

### Override in docker-compose:

```yaml
environment:
  NODE_ENV: production
  PORT: 8080
```

### Pass at runtime:

```bash
docker run -e NODE_ENV=production blockchain-apps-backend
```

---

## 📊 Health Check

### Built-in health check:

```bash
# Check health
docker inspect --format='{{.State.Health.Status}}' blockchain-backend

# View health logs
docker inspect --format='{{json .State.Health}}' blockchain-backend | jq
```

### Manual check:

```bash
# From inside container
docker exec blockchain-backend wget -qO- http://localhost:8080/health

# From host
curl http://localhost:5000/health
```

---

## 🔍 Debugging

### View logs:

```bash
# Container logs
docker logs blockchain-backend

# Last 100 lines
docker logs --tail 100 blockchain-backend

# Follow logs
docker logs -f blockchain-backend

# Logs with timestamp
docker logs -t blockchain-backend
```

### Inspect container:

```bash
# Full inspect
docker inspect blockchain-backend

# Specific field
docker inspect -f '{{.State.Status}}' blockchain-backend

# Network info
docker inspect -f '{{.NetworkSettings.IPAddress}}' blockchain-backend
```

### Shell access:

```bash
# Alpine shell
docker exec -it blockchain-backend sh

# Run commands
docker exec blockchain-backend node --version
docker exec blockchain-backend npm list
```

---

## 🎯 Optimization

### Multi-stage build:

Already implemented in `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
# Build stage

FROM node:18-alpine
# Production stage
```

### .dockerignore:

Reduce build context:
```
node_modules/
.git/
*.md
.env
```

### Layer caching:

Copy package.json first:
```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

### Image size:

```bash
# View image size
docker images blockchain-apps-backend

# Remove unused images
docker image prune

# Remove all unused data
docker system prune -a
```

---

## 🚢 Deploy to Cloud

### Docker Hub:

```bash
# Login
docker login

# Tag image
docker tag blockchain-apps-backend your-username/blockchain-apps-backend:latest

# Push
docker push your-username/blockchain-apps-backend:latest

# Pull on server
docker pull your-username/blockchain-apps-backend:latest
```

### GitHub Container Registry:

```bash
# Login
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag
docker tag blockchain-apps-backend ghcr.io/username/blockchain-apps-backend:latest

# Push
docker push ghcr.io/username/blockchain-apps-backend:latest
```

### Deploy on VPS:

```bash
# SSH to server
ssh user@your-server.com

# Pull image
docker pull your-username/blockchain-apps-backend

# Run
docker run -d \
  --name blockchain-backend \
  -p 80:8080 \
  --restart unless-stopped \
  --env-file .env \
  your-username/blockchain-apps-backend

# Setup auto-restart
docker update --restart unless-stopped blockchain-backend
```

---

## 🔐 Security

### Non-root user:

Already implemented:
```dockerfile
RUN adduser -S nodejs -u 1001
USER nodejs
```

### Scan for vulnerabilities:

```bash
# Scan image
docker scan blockchain-apps-backend

# View detailed report
docker scan --severity high blockchain-apps-backend
```

### Read-only filesystem:

```bash
docker run --read-only blockchain-apps-backend
```

### Resource limits:

```bash
docker run \
  --memory="512m" \
  --cpus="0.5" \
  blockchain-apps-backend
```

---

## 📝 Best Practices

1. **Use .dockerignore:**
   - Reduce build context
   - Faster builds

2. **Multi-stage builds:**
   - Smaller images
   - Secure production

3. **Health checks:**
   - Monitor container health
   - Auto-restart on failure

4. **Non-root user:**
   - Security best practice
   - Already implemented

5. **Environment variables:**
   - Never commit .env
   - Use secrets management

6. **Logging:**
   - Log to stdout/stderr
   - Use log aggregation

7. **Versioning:**
   - Tag images with versions
   - Use semantic versioning

---

## 🐛 Troubleshooting

### Build fails:

```bash
# Clear cache
docker builder prune

# Build with verbose
docker build --progress=plain .

# Check Dockerfile syntax
docker build --no-cache .
```

### Container won't start:

```bash
# Check logs
docker logs blockchain-backend

# Check health
docker inspect blockchain-backend

# Run interactive
docker run -it blockchain-apps-backend sh
```

### Port already in use:

```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process or use different port
docker run -p 3000:8080 blockchain-apps-backend
```

### Out of disk space:

```bash
# Clean up
docker system prune -a

# Remove unused volumes
docker volume prune

# Check disk usage
docker system df
```

---

## 📚 Resources

- **Dockerfile reference:** https://docs.docker.com/engine/reference/builder
- **Compose reference:** https://docs.docker.com/compose/compose-file
- **Best practices:** https://docs.docker.com/develop/dev-best-practices
- **Security:** https://docs.docker.com/engine/security

---

## ✅ Checklist

### Setup:
- [x] Dockerfile created
- [x] docker-compose.yml created
- [x] .dockerignore created
- [ ] .env file created

### Build:
- [ ] Build successful
- [ ] Image size optimized
- [ ] Health check working

### Run:
- [ ] Container starts
- [ ] Health check passes
- [ ] API endpoints working
- [ ] Logs visible

### Deploy:
- [ ] Push to registry
- [ ] Deploy to production
- [ ] Monitor running

---

**Docker images ready! 🐳**

Production-ready, optimized, secure!
