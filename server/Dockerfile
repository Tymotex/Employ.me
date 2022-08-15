# ----------------------------------- Setup ---------------------------------- #
FROM python:3.10-bullseye

WORKDIR /app

COPY requirements.txt .
COPY setup.sh .

RUN sh setup.sh

COPY . .

# -------------------------------- Production -------------------------------- #
EXPOSE 5555

CMD gunicorn -b 0.0.0.0:5555 start:app
