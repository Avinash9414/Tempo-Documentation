# TEMPO DOCUMENTATION

This repository contains a setup for monitoring three microservices using Grafana, Tempo, Prometheus and Docker Compose.

## Folder Structure

- `/microservices`: Contains the three microservices.
- `/configs`: Configuration files for all services.
- `docker-compose.yaml`: Docker Compose file for running Grafana, Tempo, Prometheus and the three microservices.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

## Setup and Usage

1. Clone this repository:

   ```bash
   git clone https://github.com/Avinash9414/Tempo-Documentation.git
   cd Tempo-Documentation
   ```
2. Configure the microservices.
    - Please refer to the README.md files in the `/microservices` folder for instructions on how to configure the microservices.
    
3. Start the services:

   ```bash
   docker-compose build
   docker-compose up -d
   ```
4. Open Grafana in your browser at http://localhost:3000 and login with the following credentials:

   - Username: `admin`
   - Password: `admin`

