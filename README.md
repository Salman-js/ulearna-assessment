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

## Features Implemented

### Core Features

- **Product Image Gallery**: Interactive gallery with zoom functionality for detailed product viewing
- **Variant Selection**: Real-time updates for color and size variants with visual feedback
- **Shopping Cart**: Add to cart functionality with quantity selector and real-time updates
- **Product Details**: Comprehensive product description with expandable sections for better UX
- **Responsive Design**: Fully responsive layout that adapts to all device sizes

### Advanced Features

- **Custom State Management**: Built using React Context and useReducer for efficient state handling
- **Form Validation System**: Real-time validation with immediate user feedback
- **Error Boundary System**: Custom error handling with recovery options for better user experience

### Technical Features

- **Next.js 15+**: Utilizing the latest App Router for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG 2.1 compliance (50% implementation)
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error States**: Graceful error handling and user feedback
- **Performance**: Optimized for fast loading and smooth interactions

### Bonus Features

- **Theme Support**: Dark/light mode with system preference detection
- **Analytics**: Data visualization with real-time data
- **Error Logging**: Comprehensive error logging system for debugging and monitoring
