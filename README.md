# Eventify - Collaborative Event Planner

Eventify is a collaborative platform designed to simplify event management. It allows users to create, manage, and join events while providing real-time collaboration and insightful analytics.

---

## Features

### User Authentication

- JWT-based Register/Login system.
- User roles: **Admin** (event creator) and **Participant**.

### Event Management

- Create, update, and delete events.
- Add and manage tasks within events (e.g., catering, decoration).

### Real-time Collaboration

- **Live Chat**: Participants can chat in real time.
- **Real-time Task Updates**: Task statuses update dynamically.

### Notifications

- **Email Notifications**: Event invites and task updates.
- **Push Notifications**: Optional for task reminders.

### Analytics

- View insights such as:
  - Number of participants per event.
  - Task completion rates.

### Admin Panel

- Monitor all events and participants.
- Assign tasks to specific participants.

---

## Database Schema

### User

| Field      | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `id`       | PK     | Unique identifier.          |
| `username` | String | Username of the user.       |
| `email`    | String | Email address of the user.  |
| `password` | String | Hashed password.            |
| `role`     | Enum   | Role: Admin or Participant. |

### Event

| Field         | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `id`          | PK        | Unique identifier.           |
| `title`       | String    | Title of the event.          |
| `description` | Text      | Description of the event.    |
| `date`        | DateTime  | Date and time of the event.  |
| `location`    | String    | Event location.              |
| `created_by`  | FK (User) | Admin who created the event. |

### Task

| Field         | Type       | Description                       |
| ------------- | ---------- | --------------------------------- |
| `id`          | PK         | Unique identifier.                |
| `title`       | String     | Title of the task.                |
| `description` | Text       | Task details.                     |
| `status`      | Enum       | Status: To Do, In Progress, Done. |
| `assigned_to` | FK (User)  | Participant assigned to task.     |
| `event_id`    | FK (Event) | Event the task belongs to.        |

### Message

| Field       | Type       | Description                   |
| ----------- | ---------- | ----------------------------- |
| `id`        | PK         | Unique identifier.            |
| `content`   | Text       | Message content.              |
| `sender_id` | FK (User)  | User who sent the message.    |
| `event_id`  | FK (Event) | Event the message belongs to. |
| `timestamp` | DateTime   | Time message was sent.        |

---

## Tech Stack

### Backend

- **Framework**: Spring Boot.
- **Database**: PostgreSQL.
- **ORM**: Hibernate.
- **WebSocket**: Spring WebSocket for real-time features.
- **Authentication**: Spring Security with JWT.
- **Email Service**: Spring Mail.
- **Testing**: JUnit + Mockito.

### Frontend

- **Framework**: React, React Router & Vite.
- **UI**: Shadcn.
- **State Management**: Zustand.

### Deployment

- **Containerization**: Docker.
- **Reverse Proxy**: Caddy.

---

## Challenges Tackled

1. **REST API**
   - Build robust endpoints with validation and error handling.
2. **WebSockets**
   - Enable real-time chat and task updates with authentication.
3. **Database Relationships**
   - Manage complex relations between `User`, `Event`, and `Task` tables.
4. **Testing**
   - Implement unit and integration tests for critical services.
5. **SQL Optimization**
   - Optimize queries for analytics and performance.
6. **Deployment**
   - Dockerize and deploy the app with a reverse proxy.

---

## Setup Instructions

### Prerequisites

- Java 17+
- PostgreSQL
- Node.js (for frontend)
- Docker (optional for containerization)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/maiko26/eventify.git
   ```
2. Navigate to the backend folder:
   ```bash
   cd eventify/backend
   ```
3. Configure application properties for PostgreSQL and JWT:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/eventify
   spring.datasource.username=your_db_user
   spring.datasource.password=your_db_password

   jwt.secret=your_jwt_secret
   jwt.expiration=3600000
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd eventify/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

### Running with Docker

1. Build and run Docker containers:
   ```bash
   docker-compose up --build
   ```

---

## Contribution

Feel free to fork this repository and submit pull requests for improvements or new features.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
