# Notification System Design

---

# Stage 1 — Basic Notification Service Design

## APIs

### Create Notification

POST /notifications

### Get Notifications

GET /notifications/:studentID

### Mark Notification as Read

PATCH /notifications/:id/read

### Delete Notification

DELETE /notifications/:id

## Features

- Real-time notifications
- Read/unread tracking
- Priority-based delivery
- Retry mechanism

## Real-Time Communication

- WebSockets
- Server Sent Events (SSE)

---

# Stage 2 — Database Design

## Recommended Database

PostgreSQL

## Tables

### Notifications Table

- id
- studentID
- title
- message
- priority
- isRead
- createdAt

## Optimization

- Indexing
- Pagination
- Query optimization

---

# Stage 3 — Query Optimization

## Problem

Queries become slow with millions of notifications.

## Solution

Use composite indexing.

### SQL Query

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt DESC);

```

## Benefits

- Faster filtering
- Faster sorting
- Reduced query execution time

---

# Stage 4 — Scaling Strategy

## Techniques

- Redis caching
- Pagination
- Lazy loading
- Horizontal scaling
- Load balancing

## Benefits

- Reduced database load
- Faster API responses
- Better scalability

---

# Stage 5 — High Volume Notification Processing

## Problem

Sequential notification sending is slow.

## Solution

Use asynchronous queues.

## Recommended Technologies

- RabbitMQ
- Kafka

## Additional Improvements

- Worker queues
- Retry mechanism
- Dead letter queue

---

# Stage 6 — Priority Notification Algorithm

## Requirement

Display highest priority notifications first.

Priority Order:

1. Placement
2. Results
3. Events

## Recommended Data Structure

Priority Queue / Heap

## Benefits

- Efficient retrieval
- Faster prioritization
- Scalable notification processing
