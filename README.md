# ts-boring

Simple and boring TypeScript template.

Makes use of

- Node 24.x,
- TypeScript without JS emissions as Node now supports ESM and stripping type annotations
- Jest for testing
- ESLint for linting
- Prettier for formatting
- Husky + lint-staged to adhere to formatting and linting rules on commits.

## Table of Contents

- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Project Configuration](#project-configuration)
  - [TypeScript Configuration](#typescript-configuration)
  - [Jest Configuration](#jest-configuration)
  - [ESLint Configuration](#eslint-configuration)
  - [lint-staged Configuration](#lint-staged-configuration)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Husky (for git hooks):**
   ```bash
   npm run prepare
   ```

That's it! The project is ready to use.

## Running the Project

### Start the application

```bash
npm start
```

### Run in watch mode (auto-restart on file changes)

```bash
npm watch
```

### Run tests

```bash
npm test
```

### Format code

```bash
npm run format
```

### Lint code

```bash
npm run lint
```

## Project Configuration

This project uses a modern Node.js setup with TypeScript, Jest, ESLint, and lint-staged. Below is an explanation of why each configuration choice was made.

### TypeScript Configuration

The TypeScript configuration (`tsconfig.json`) is optimized for **Node.js 24.x LTS**, which has native support for TypeScript and ES Modules.

**Key configuration choices:**

- **`"noEmit": true`** - Node.js 24.x LTS can run TypeScript files directly without compilation, so we don't need to emit JavaScript files. This speeds up development and reduces build complexity.

- **`"module": "nodenext"` and `"moduleResolution": "nodenext"`** - These settings ensure proper ES Module support, which aligns with the project's `"type": "module"` in `package.json`. This is the recommended approach for modern Node.js projects.

- **`"allowImportingTsExtensions": true`** - Allows importing TypeScript files with `.ts` extensions, which is necessary when using ES Modules with TypeScript and when no source files are emitted as JS files.

- **`"verbatimModuleSyntax": true`** - Ensures that import/export statements are preserved exactly as written, which is important for ES Modules and prevents TypeScript from rewriting them.

- **`"isolatedModules": true`** - Required when using tools like `ts-jest` that compile files individually. Ensures each file can be safely transpiled in isolation.

- **`"target": "esnext"`** - Uses the latest ECMAScript features, taking advantage of Node.js 24.x's modern runtime capabilities.

- **`"strict": true`** - Enables all strict type-checking options for maximum type safety.

These settings provide maximum type safety and catch potential bugs at compile time.

### Jest Configuration

The Jest configuration (`jest.config.mjs`) uses `ts-jest` with ESM support.

**Key configuration choices:**

- **`createDefaultEsmPreset()`** - Provides ESM support for Jest, which is necessary since this project uses ES Modules (`"type": "module"`). This preset handles TypeScript compilation and ESM transformation.

- **`NODE_OPTIONS="--experimental-vm-modules"`** - Required in the test script to enable Jest's ESM support. This flag allows Jest to work with ES Modules in Node.js.

- **Extends `defaults`** - Inherits sensible default Jest configuration while adding ESM/TypeScript support.

This setup allows Jest to run TypeScript tests written in ES Module syntax without requiring a build step.

### ESLint Configuration

The ESLint configuration (`eslint.config.mjs`) uses the new **flat config** format (ESLint 9+) with TypeScript and Prettier integration.

**Key configuration choices:**

- **Flat config format** - Uses the modern ESLint 9+ configuration format, which is simpler and more maintainable than the legacy `.eslintrc` format.

- **`eslint.configs.recommended`** - Base recommended rules from ESLint core.

- **`tseslint.configs.recommended`** - TypeScript-specific linting rules that catch common TypeScript errors and enforce best practices.

- **`eslintConfigPrettier`** - Disables ESLint rules that conflict with Prettier formatting. This ensures ESLint focuses on code quality while Prettier handles formatting, preventing conflicts between the two tools.

- **`jestConfig.configs['flat/recommended']`** - Adds Jest-specific linting rules to catch common testing mistakes and enforce Jest best practices.

This configuration provides comprehensive linting for TypeScript code while ensuring compatibility with Prettier and proper support for Jest test files.

### lint-staged Configuration

The lint-staged configuration (`lint-staged.config.mjs`) runs code quality checks on staged files before commits.

**Key configuration choices:**

- **`'src/**/\*.{ts}': ['eslint --fix', 'prettier --write']`\*\* - For all staged TypeScript files:
  - Runs ESLint with `--fix` to automatically fix linting issues
  - Runs Prettier to format the code

This ensures that all committed code is properly formatted and linted, maintaining code quality across the project. The configuration works with Husky (configured via `npm run prepare`) to run these checks automatically on git commits.
