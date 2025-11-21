# Kafka Activity System

## Project's Architecture
The project is built around **Microservices** and uses an **Event Driven Architecture**, with four microservices working with each other:
- **Apache Kafka** is used as the message broker, where it stores activities from producers as topics, allowing consumers to receive and process them in real-time.
- **Producer Service** sends user activities to Kafka to store them.
- **Consumer Service** listens to Kafka topics and processes events, then saves them to MongoDB.
- **API Service** exposes an endpoint for clients to interact and query the system for activities.
- Finally, **MongoDB** is used to store all processed activities by the consumers.

### Data Flow
1. **Producer** sends user activity.
2. **Kafka** creates a topic (`user-activity`) and stores incoming activity.
3. **Consumer** reads activity from Kafka.
4. **Consumer** processes activity.
5. **Consumer** stores it in **MongoDB**.
6. **API** exposes `GET /activities` to read processed logs.

All services are containerized and orchestrated by **Docker Compose** (local development), or **Kubernetes** (Google Cloud deployment), allowing the system to be scalable and easy to deploy and maintain.

### Notes
- Environment variables for local development are loaded from the .env file.
- Kafka topics are created automatically when the producer sends the first message.

---

## Running the Project Locally

To run all services on your machine, make sure you have **Docker Desktop** installed. Then you can use the provided `docker-compose.yaml` file to start all the services.

```bash
# Navigate to the project root
cd path/to/project

# Build and start all services on the first run
docker compose up --build
```

This command will:
- Build all application images for Kafka, API, Producer, and Consumer services
- Automatically connect them all to each other while making sure they start after Kafka is ready
- If the consumer fails on first run, restarting it once will fix it.


```bash
# On subsequent runs you can start the containers without building
docker compose up

# You can stop the containers using the down parameter
docker compose down
```

Once the services are running:
- Access the API at [http://localhost:5000](http://localhost:5000).
- You can add query parameters to your request using `userId`, `eventType`, `limit`, and `page` 
Example: [http://localhost:5000/activities?userId=649&eventType=view&page=1&limit=100](http://localhost:5000/activities?userId=649&eventType=view&page=1&limit=100)