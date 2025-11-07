# React Mini-App Assessment

A simple React dashboard application that displays a list of projects with search functionality and detailed project views. Built with React 18+, Vite, TypeScript, and React Router.

## Features

- 📋 **Projects List**: View all projects in a responsive grid layout
- 🔍 **Search Filter**: Filter projects by name, description, or status
- 📄 **Project Details**: View detailed information for each project
- 🎣 **Custom Hook**: Uses `useProjects` hook for data management
- ♿ **Accessibility**: Includes ARIA attributes for screen reader support
- 🧪 **Tests**: Includes minimal test coverage

## Tech Stack

- **React 19.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities

## Prerequisites

- Node.js (v18 or higher recommended)
- yarn (or npm)

## Installation

1. Install dependencies:

```bash
yarn install
```

## Running the Application

### Development Server

Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Build the application for production:

```bash
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
yarn preview
```

## Running Tests

Run the test suite:

```bash
yarn test
```

Run tests in watch mode:

```bash
yarn test --watch
```

## Project Structure

```
src/
├── components/
│   ├── ProjectsList.tsx          # Main projects list with search
│   ├── ProjectsList.css          # Styles for projects list
│   ├── ProjectsList.test.tsx     # Tests for ProjectsList
│   ├── ProjectDetails.tsx        # Project detail view
│   └── ProjectDetails.css        # Styles for project details
├── hooks/
│   └── useProjects.ts            # Custom hook for project data
├── test/
│   └── setup.ts                  # Test setup configuration
├── App.tsx                       # Main app component with routing
├── App.css                       # App styles
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## Key Components

### useProjects Hook

Custom hook that manages project data with loading and error states. Uses mocked data locally.

```typescript
const { projects, loading, error, getProjectById } = useProjects();
```

### ProjectsList Component

Displays a grid of project cards with a search input for filtering. Each card links to the project detail page.

### ProjectDetails Component

Shows detailed information for a selected project, including name, description, status, and creation date.

## Accessibility Features

- ARIA labels on interactive elements
- Semantic HTML structure
- Screen reader-friendly announcements
- Keyboard navigation support

## Browser Support

Modern browsers that support ES6+ features.

## License

MIT
