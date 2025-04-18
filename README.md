# Ulearna Store

Built with Next.js, TailwindCSS & Prisma

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd ulearna-assessment
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the PostgreSQL database:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

## Key Technical Decisions

### Frontend Architecture

- **Next.js 15**: For server-side rendering and optimal performance
- **React 19**: Latest version for enhanced features and performance
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling and rapid development
- **Radix UI**: For accessible and customizable UI components
- **React Query**: For efficient data fetching and caching
- **React Hook Form**: For form handling with validation
- **Zod**: For runtime type checking and validation

### Backend Architecture

- **Prisma**: Modern ORM for type-safe database operations
- **PostgreSQL**: Robust relational database
- **Docker**: Containerization for consistent development environment

### Testing

- **Jest**: For unit and integration testing
- **React Testing Library**: For component testing

## How to Run the Project

### Development

```bash
npm run dev
```

This will start the development server with Turbopack for faster builds.

### Production

```bash
npm run build
npm start
```

### Docker Deployment

```bash
docker-compose up -d
```

## Unit Tests for Critical Components

The project includes comprehensive testing for critical components. To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- Component rendering and interactions
- Form validations
- API integrations
- Database operations
- State management

### Testing Best Practices

1. Write tests before implementing features (TDD)
2. Focus on testing component behavior rather than implementation details
3. Use mock data for API calls
4. Test edge cases and error scenarios
5. Maintain high test coverage for critical paths
