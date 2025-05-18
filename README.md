# Frontend – React + Vite + TypeScript
## This project is a high-performance frontend application built with React, powered by Vite and written in TypeScript. It includes a robust unit testing setup using Vitest, ensuring confidence and reliability in the codebase.

 # Project Structure
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Route-based views
│   ├── hooks/               # Custom hooks
│   ├── services/            # API and business logic
│   ├── types/               # TypeScript types/interfaces
│   ├── App.tsx              # Root component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── vite.config.ts           # Vite config
├── tsconfig.json            # TypeScript config
├── README.md

## Getting Started
* 1. Clone the Repository
  
```bash
$ git clone https://github.com/hasansharif819/employee-management-client.git
$ cd your-project
  ```

## 2. Install Dependencies
```bash
$ npm install
```

## 3. Start the Development Server

```bash
$ npm run dev
```

* Open in your browser.
* http://localhost:5173

## Unit Testing with Vitest

* Installation
```bash
$ npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
## Configure Vitest
* Update your vite.config.ts:

```bash
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

* Create src/test/setup.ts
* 
```bash
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Running Tests

```bash
$ npm run test
```

* To watch tests:

```bash
$ npm run test:watch
```
* Add these to your package.json scripts:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch"
}

## Linting & Formatting

ESLint – For code quality

Prettier – For consistent formatting

```bash
$ npm install -D eslint prettier eslint-plugin-react eslint-config-prettier
```

## Building for Production

```bash
$ npm run build
```
## Finally Deploy on the server (AWS)
