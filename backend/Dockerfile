FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Создаем непривилегированного пользователя для запуска приложения
RUN adduser --disabled-password --gecos "" appuser
USER appuser

# Переменные окружения для Fly.io
ENV HOST=0.0.0.0
ENV PORT=8080

# Запускаем приложение
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
