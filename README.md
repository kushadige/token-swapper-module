# Project Documentation

A token swapper module that allows users to swap tokens between two different wallets, built with React Hook Form, Shadcn-UI, and Tailwind.

### Built With

[![react-hook-form][React-hook-form]][React-hook-form-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Next.js][Next.js]][Next.js-url]
[![Shadcn-ui][Shadcn-ui]][Shadcn-ui-url]
[![Tailwind][Tailwind]][Tailwind-url]

## # Prerequisites

Ensure you have the following installed on your machine:

- Node.js installed on your machine.
- A package manager such as npm, yarn, pnpm, or bun.

## # Initial Setup

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**

   ```sh
   npm run dev
   ```

   **Note**: _By default the development server runs on port 3000. Change the port by setting the `PORT` environment variable._

## # Workspace Structure

- **src/**: Source code directory.
  - **app/**: Application layout and routing.
  - **components/**: Shared components used in the application.
  - **modules/**: Located in the `src/modules/` directory. Contains the token swapper module.
  - **lib/**: Library code, utilities.
  - **modules/**: Application modules.
    - **token-swapper/**: Token swapper module.
      - **@types/**: Type definitions used throughout the token swapper module.
      - **assets/**: Static assets such as icons for the module.
      - **components/**: Contains React components.
      - **data/**: Static data for the module.
      - **schemas/**: Zod schemas for validating data structures.
      - **services/**: Service classes and functions for handling business logic.
      - **utils/**: Utility functions.
      - **views/**: View components for different parts of the module.
      - `index.tsx`: Module entry point.
- **tailwind.config.ts**: Configuration for Tailwind CSS.
- **tsconfig.json**: Configuration for TypeScript.
- **components.json**: Contains metadata and configuration for UI components.
- **package.json**: Manages project dependencies and scripts.
- **postcss.config.js**: Configuration for PostCSS, a tool for transforming CSS with JavaScript.
- **.gitignore**: Specifies intentionally untracked files to ignore.

## # Dependencies

- [**react-hook-form:**](https://react-hook-form.com/) Form validation library.
- [**@hookform/resolvers:**](https://www.npmjs.com/package/@hookform/resolvers) Resolvers for react-hook-form.
- [**zod:**](https://www.npmjs.com/package/zod) TypeScript-first schema declaration and validation library.
- [**shadcn-ui:**](https://ui.shadcn.com/) Collection of UI components.
- [**tailwindcss:**](https://tailwindcss.com/) Utility-first CSS framework.
- [**typescript:**](https://www.typescriptlang.org/) Typed superset of JavaScript.
- [**next:**](https://nextjs.org/) React framework for building server-rendered applications.

## # Deployment

The application is deployed to Vercel using the GitHub repository.

[React-hook-form]: https://img.shields.io/badge/react--hook--form-0F172A?style=for-the-badge&logo=react-hook-form&logoColor=white
[React-hook-form-url]: https://react-hook-form.com/
[Shadcn-ui]: https://img.shields.io/badge/shadcn--ui-0F172A?style=for-the-badge&logo=shadcn-ui&logoColor=white
[Shadcn-ui-url]: https://ui.shadcn.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[Next.js-url]: https://nextjs.org/
