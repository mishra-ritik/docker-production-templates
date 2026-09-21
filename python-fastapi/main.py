from fastapi import FastAPI

app = FastAPI(title="fastapi-sample")


@app.get("/")
def root():
    return {"service": "python-fastapi", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "healthy"}
