import os
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = {}
for env_file in [
    Path("/app/frontend/.env"),
    Path(__file__).resolve().parents[1] / "frontend" / ".env",
    Path(__file__).resolve().parents[2] / "frontend" / ".env",
]:
    if env_file.exists():
        frontend_env.update(dotenv_values(env_file))

base_url = (
    os.environ.get("REACT_APP_BACKEND_URL")
    or frontend_env.get("REACT_APP_BACKEND_URL")
    or "http://localhost:8000"
)
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="session")
def api_url():
    return BASE_URL


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s
