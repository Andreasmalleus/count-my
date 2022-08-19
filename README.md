# count-my

Text processing application, that consists of multiple services.

### Features

**Core service**

- Endpoint for uploading a file
- Endpoints for retrieving and deleting data
- Upladed file is sent as chunks to the message broker (RabbitMQ)
- Reply message is received and sent to the client

**Worker service**

- Receives messages from the broker
- Processes the chunks
- Sends the result to the database
- Generates and sends a unique identifier to the core service

**Web**

- Retrieves data by calling the core service
- Visualizes the data using a word cloud and a table
- Ability to filter the data
- User can also download the data as JSON
- Delete option is also available

### Technologies used

**Core & Worker**
Spring Boot

**Web / Client**
React

**Database**
PostgreSQL

**Message broker**
RabbitMQ
