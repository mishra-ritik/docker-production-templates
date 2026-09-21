# Docker Production Templates

Production-minded Dockerfiles I use as starting points for client projects. Each example is a small working app, so the Dockerfile can be built and run as-is.

## What's inside

| Folder | Stack | Highlights |
|---|---|---|
| `node-express/` | Node.js 22 (Alpine) | Multi-stage build, prod-only dependencies, non-root user, healthcheck, graceful shutdown |
| `python-fastapi/` | Python 3.12 (slim) | Wheel-building stage, no compilers in the final image, non-root user, healthcheck |
| `docker-compose.yml` | Both services | Read-only filesystem, all Linux capabilities dropped, `no-new-privileges` |

## Practices applied

- **Multi-stage builds** to keep images small and free of build tooling
- **Non-root runtime user** so a compromised container has limited reach
- **Layer-cache-friendly ordering** (dependency manifests copied before source)
- **`.dockerignore`** to keep secrets, `.git` and local files out of the build context
- **`HEALTHCHECK`** so orchestrators can detect unhealthy containers
- **Pinned base image and dependency versions** for reproducible builds
- **Hardened runtime** options in Compose

## Run it

```bash
docker compose up --build

curl localhost:3000/health   # node-express
curl localhost:8000/health   # python-fastapi
```

## Work with me

I'm a DevOps engineer (AWS, Docker, Terraform, CI/CD). I can containerize your application, cut image size and build times, and set up the CI pipeline around it. Find me on Upwork or open an issue here.

See also: [nginx-production-configs](https://github.com/mishra-ritik/nginx-production-configs)
