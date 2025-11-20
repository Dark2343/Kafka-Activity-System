# Node image
FROM node:22-alpine

# Directory the app is gonna work from in the container
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install libraries
RUN npm install

# Copy the rest of the code
COPY ./src ./src

# Expose the port the server is running on
EXPOSE 5000

# Run the server
CMD [ "node", "src/infrastructure/api/server.js" ]