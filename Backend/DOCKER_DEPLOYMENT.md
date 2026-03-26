# Docker Deployment Guide

This guide covers deploying the Pizzarria backend using Docker.

## Prerequisites

- Docker Desktop (Windows) or Docker Engine (Linux/Mac)
- Docker Compose
- `.env` file with your MongoDB URI and JWT secret

## Quick Start

### 1. Build and Run with Docker Compose (Recommended)

```powershell
# Production mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### 2. Development Mode (with hot-reload)

```powershell
# Start development container with volume mounting
docker-compose -f docker-compose.dev.yml up

# Stop
docker-compose -f docker-compose.dev.yml down
```

### 3. Manual Docker Build & Run

```powershell
# Build the image
docker build -t pizzarria-backend:latest .

# Run the container
docker run -d `
  -p 5000:8080 `
  -e MONGO_URI="your_mongo_uri" `
  -e JWT_SECRET="your_jwt_secret" `
  -e PORT=8080 `
  --name pizzarria-backend `
  pizzarria-backend:latest

# View logs
docker logs -f pizzarria-backend

# Stop container
docker stop pizzarria-backend
docker rm pizzarria-backend
```

## Environment Variables

Required environment variables (set in `.env` or pass via `-e`):

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Port to run the server (default: 8080 in container)
- `NODE_ENV` - Environment mode (production/development)

## Health Check

The container includes a health check that tests the `/test` endpoint:

```powershell
# Check container health status
docker inspect --format='{{.State.Health.Status}}' pizzarria-backend
```

## Deployment Platforms

### Docker Hub

```powershell
# Tag your image
docker tag pizzarria-backend:latest yourusername/pizzarria-backend:latest

# Push to Docker Hub
docker push yourusername/pizzarria-backend:latest
```

### AWS ECS / Azure Container Instances / Google Cloud Run

1. Build the image:

   ```powershell
   docker build -t pizzarria-backend:latest .
   ```

2. Tag for your registry:

   ```powershell
   # AWS ECR example
   docker tag pizzarria-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/pizzarria-backend:latest

   # Azure ACR example
   docker tag pizzarria-backend:latest <registry-name>.azurecr.io/pizzarria-backend:latest

   # Google GCR example
   docker tag pizzarria-backend:latest gcr.io/<project-id>/pizzarria-backend:latest
   ```

3. Push to registry and deploy using platform-specific CLI/console

### Heroku Container Registry

```powershell
# Login to Heroku container registry
heroku container:login

# Build and push
heroku container:push web -a your-app-name

# Release
heroku container:release web -a your-app-name
```

### Railway / Render / Fly.io

These platforms typically auto-detect the Dockerfile and build automatically when you connect your Git repository.

## Production Best Practices

1. **Environment Variables**: Never commit `.env` files. Use secrets management:

   - Docker Swarm: `docker secret`
   - Kubernetes: `kubectl create secret`
   - Cloud platforms: Use their built-in secret managers

2. **Multi-stage Build**: The production Dockerfile uses multi-stage builds to minimize image size.

3. **Non-root User**: Container runs as non-root user `expressjs` for security.

4. **Health Checks**: Integrated health checks ensure container reliability.

5. **Resource Limits**: Set CPU/memory limits in production:
   ```yaml
   # In docker-compose.yml
   deploy:
     resources:
       limits:
         cpus: "1"
         memory: 512M
   ```

## Troubleshooting

### Container won't start

```powershell
# Check logs
docker logs pizzarria-backend

# Common issues:
# - MongoDB connection failed: Check MONGO_URI
# - Port already in use: Change host port mapping
```

### Can't connect to MongoDB Atlas

Ensure your deployment IP is whitelisted in MongoDB Atlas:

- Add `0.0.0.0/0` for testing (not recommended for production)
- Add specific cloud platform IP ranges

### Permission errors

The container runs as non-root user. If you need to debug:

```powershell
docker run -it --user root pizzarria-backend:latest sh
```

## Monitoring

```powershell
# View resource usage
docker stats pizzarria-backend

# View running processes
docker top pizzarria-backend
```

## Cleanup

```powershell
# Remove container
docker rm -f pizzarria-backend

# Remove image
docker rmi pizzarria-backend:latest

# Prune unused images/containers
docker system prune -a
```
