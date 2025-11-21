# Kafka Activity System

## Project's Architecture
The project is built around **Microservices** and uses an **Event Driven Architecture**, following **Domain-Driven Design (DDD)** principles to structure the business logic. Four microservices work together:
- **Apache Kafka** acts as the message broker, storing activities from producers as topics, while allowing consumers to receive and process them in real-time.
- **Producer Service** sends user activities to Kafka.
- **Consumer Service** listens to Kafka topics and processes activities, then saves them to MongoDB.
- **API Service** exposes an endpoint for clients to query the system for activities.
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
- Environment variables for local development are loaded from the `.env` file.
- Kafka topics are created automatically when the producer sends the first message.

---

## Deployment

The **Kafka Activity System** is fully containerized and can run both locally and on the cloud:

- **Local Development:**  
  - Each microservice (Kafka, Producer, Consumer, API) runs in its own container using **Docker Compose**.  
  - Images can be built locally or pulled from **Docker Hub** (`dark2343/api`, `dark2343/producer`, `dark2343/consumer`).  
  - Compose handles dependencies, making sure Kafka is ready before producers and consumers start.

- **Cloud Deployment (Google Kubernetes Engine):** 
  - The entire project is also hosted on GKE, where it uses the docker hub images to build pods on the cloud.
  - Each service runs in a separate **pod**, allowing independent scaling and isolated resource management.  
  - Kafka, API, Producer, and Consumer pods communicate internally through **ClusterIP services**, while the API pod is exposed externally via a **LoadBalancer**.  
  - Pod logs can be monitored individually, showing real-time activity and interactions between services.

This setup shows how the project can easily run using **Docker** for local development, while on **Kubernetes** each service runs in its own pod on Google Cloud, making it scalable and easy to manage.

---

## Running the Project Locally

To run all services on your machine, make sure you have **Docker Desktop** installed, and have a **MongoDB instance** on MongoDB Atlas. Then you can use the provided `docker-compose.yaml` file to start all the services.

```bash
# Navigate to the project root
cd path/to/project

# Build and start all services on the first run
docker compose up --build
```

This command will:
- Build all application images for Kafka, API, Producer, and Consumer services
- Automatically connect them all to each other while making sure they start after Kafka is ready
- On the first run, the consumer container may start before the Kafka topic exists, so restarting it once fixes it.


```bash
# On subsequent runs you can start the containers without rebuilding
docker compose up

# Stop all containers
docker compose down
```

### Environment Variables
You need your own **MongoDB instance** to run the project. Create a `.env` file in the project root with the following key:

```bash
MONGO_URI=<your-mongodb-uri>
```

Once the services are running:
- Access the API at [http://localhost:5000](http://localhost:5000).
- You can add query parameters to your request using `userId`, `eventType`, `limit`, and `page` 
Example: [http://localhost:5000/activities?userId=649&eventType=view&page=1&limit=100](http://localhost:5000/activities?userId=649&eventType=view&page=1&limit=100)