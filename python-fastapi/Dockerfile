# syntax=docker/dockerfile:1

# ---- Stage 1: build wheels (keeps compilers out of the final image) ----
FROM python:3.12-slim AS builder
WORKDIR /build
ENV PIP_DISABLE_PIP_VERSION_CHECK=1 PIP_NO_CACHE_DIR=1
COPY requirements.txt .
RUN pip wheel --wheel-dir /wheels -r requirements.txt

# ---- Stage 2: runtime ----
FROM python:3.12-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app

# Install from pre-built wheels, then drop them
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links=/wheels fastapi "uvicorn[standard]" \
    && rm -rf /wheels

# Dedicated unprivileged user
RUN useradd --system --uid 10001 --no-create-home appuser
COPY --chown=appuser:appuser main.py .
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health').status==200 else 1)"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
