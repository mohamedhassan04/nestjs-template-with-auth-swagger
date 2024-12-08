# NestJS Application Starter Template

This repository provides a robust and scalable starting point for building backend applications using **NestJS**, equipped with key features like Swagger documentation, PostgreSQL database integration, JWT-based authentication with HTTP-only cookies, and email functionality using Nodemailer.

## Features

- **NestJS Framework**: Scalable and maintainable backend architecture.
- **PostgreSQL Integration**: Efficient database management with TypeORM.
- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies.
- **Swagger Documentation**: API documentation and testing interface.
- **Nodemailer Integration**: Email functionality for notifications and communication.
- **Environment Configuration**: Secure and modular configuration for different environments.

## Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- **PostgreSQL**: Version 12 or higher
- **Docker** (optional): For containerized development and deployment

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/nestjs-starter-template.git
   cd nestjs-starter-template
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   COOKIE_SECURE=false # Set to true in production
   SMTP_HOST=smtp.your-email-provider.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_email_password
   ```

4. **Run the application**:

   ```bash
   npm run start:dev
   ```

## Usage

### API Documentation

Swagger documentation is available at [http://localhost:5000/docs/v1](http://localhost:5000/docs/v1) by default.

### Authentication

- Authentication is managed via JWT stored in HTTP-only cookies for enhanced security.
- To log in, send a `POST` request to `/auth/login` with your credentials.
- Use the provided cookie for subsequent authenticated requests.

### Sending Emails

- Use the `/email/send` endpoint (or similar as per your configuration) to trigger email sending functionality.
- Configure SMTP settings in the `.env` file.

## Project Structure

```plaintext
src/
├── auth/               # Authentication module (JWT, Guards, etc.)
├── common/             # Shared modules, interceptors, and utilities
├── config/             # Database module and entities
├── email/              # Nodemailer integration
├── app.module.ts
├── index.ts            # Main file for modules
├── main.ts             # Application entry point
```

## Docker Support

The application includes a `Dockerfile` and `docker-compose.yml` for containerized development.

1. **Build and start the containers**:

   ```bash
   docker-compose up --build
   ```

2. The application will be available at [http://localhost:5000](http://localhost:5000).

## Scripts

- `npm run start`: Start the application in production mode.
- `npm run start:dev`: Start the application in development mode with hot reloading.
- `npm run lint`: Run linting.
- `npm run test`: Run tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## Contact

For inquiries or support, reach out at hassenmohamed.92\@gmail.com
