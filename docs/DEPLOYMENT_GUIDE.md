# MCAN National Website - Deployment Guide

## Overview
This guide covers the deployment of the MCAN National Website platform, including both frontend and backend components.

## Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15+
- Redis 7+
- Domain name and SSL certificates
- Cloud storage (AWS S3 or Cloudinary)

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/mcan-nigeria/mcan-national-website.git
cd mcan-national-website
```

### 2. Environment Variables
Copy the example environment file and configure:

```bash
cp backend/env.example backend/.env
```

Configure the following variables:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=mcan_db
DB_USER=mcan_user
DB_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Payment Gateway
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# File Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Docker Deployment

### 1. Build and Start Services
```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 2. Database Setup
```bash
# Run database migrations
docker-compose exec backend npm run migrate

# Seed initial data
docker-compose exec backend npm run seed
```

### 3. Verify Deployment
```bash
# Check service status
docker-compose ps

# Test API health
curl http://localhost:5000/health

# Test frontend
curl http://localhost:3000
```

## Production Deployment

### 1. Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB+ 
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

### 2. SSL Configuration
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.mcan.org.ng
sudo certbot --nginx -d mcan.org.ng
```

### 3. Nginx Configuration
```nginx
# /etc/nginx/sites-available/mcan
server {
    listen 80;
    server_name mcan.org.ng www.mcan.org.ng;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mcan.org.ng www.mcan.org.ng;
    
    ssl_certificate /etc/letsencrypt/live/mcan.org.ng/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mcan.org.ng/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U mcan_user mcan_db > backup_$DATE.sql

# Schedule daily backups
echo "0 2 * * * /path/to/backup_script.sh" | crontab -
```

### 5. Monitoring Setup
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Setup log rotation
sudo nano /etc/logrotate.d/mcan
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/mcan-national-website
            git pull origin main
            docker-compose down
            docker-compose build
            docker-compose up -d
```

## Scaling

### Horizontal Scaling
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    deploy:
      replicas: 3
    environment:
      - NODE_ENV=production
  
  frontend:
    deploy:
      replicas: 2
```

### Load Balancer Configuration
```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

upstream frontend {
    server frontend1:80;
    server frontend2:80;
}
```

## Security

### 1. Firewall Configuration
```bash
# UFW setup
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Database Security
```sql
-- Create read-only user
CREATE USER mcan_readonly WITH PASSWORD 'readonly_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mcan_readonly;
```

### 3. Application Security
- Enable HTTPS only
- Implement rate limiting
- Use strong JWT secrets
- Regular security updates
- Database encryption at rest

## Monitoring and Logging

### 1. Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 2. Log Management
```bash
# Setup log aggregation
sudo apt install rsyslog

# Configure log forwarding
echo "*.* @@log-server:514" >> /etc/rsyslog.conf
```

### 3. Health Checks
```bash
# Create health check script
#!/bin/bash
curl -f http://localhost:5000/health || exit 1
curl -f http://localhost:3000 || exit 1
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check database status
   docker-compose exec postgres pg_isready
   
   # Check logs
   docker-compose logs postgres
   ```

2. **Frontend Build Failed**
   ```bash
   # Clear node modules
   rm -rf frontend/node_modules
   docker-compose build frontend --no-cache
   ```

3. **API Not Responding**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Restart backend
   docker-compose restart backend
   ```

### Performance Optimization

1. **Database Optimization**
   ```sql
   -- Analyze query performance
   EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
   
   -- Create additional indexes
   CREATE INDEX CONCURRENTLY idx_users_email_active ON users(email) WHERE is_active = true;
   ```

2. **Caching Strategy**
   ```bash
   # Redis memory optimization
   redis-cli CONFIG SET maxmemory 1gb
   redis-cli CONFIG SET maxmemory-policy allkeys-lru
   ```

## Backup and Recovery

### 1. Database Backup
```bash
# Full backup
pg_dump -h localhost -U mcan_user mcan_db > full_backup.sql

# Incremental backup
pg_basebackup -h localhost -U mcan_user -D /backup/incremental
```

### 2. Application Backup
```bash
# Backup application files
tar -czf mcan_backup_$(date +%Y%m%d).tar.gz /path/to/mcan-national-website

# Backup configuration
cp -r /etc/nginx/sites-available/mcan /backup/nginx/
```

### 3. Recovery Procedures
```bash
# Restore database
psql -h localhost -U mcan_user mcan_db < full_backup.sql

# Restore application
tar -xzf mcan_backup_20240101.tar.gz -C /
```

## Support
For deployment support:
- Email: tech@mcan.org.ng
- Documentation: https://docs.mcan.org.ng
- Emergency: +234-800-MCAN-HELP
