This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
ou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
# JAWA TRADERS (Reminder to self add once logo done) SPA - A Star Wars Starship Browser 🚀

This is a Single Page Application (SPA) built using **Next.js** and **TypeScript** that fetches and displays Star Wars starships from the **Star Wars API (SWAPI)**. The app allows users to browse a list of starships, view details, adjust quantities, and add items to their basket. Pagination is also implemented to browse through starship categories.

## Features

- Fetch starships from the [Star Wars API (SWAPI)](https://swapi.dev/)
- Displays the first 10 starships
- Allows users to add quantity of starships 
- Shows a notification when an item is added to the basket
- Pagination
- A simple category dropdown menu for later dev (currently set up for starships, planets, people)
- Built with **TypeScript** for better security and EsLint Support and **Carbon Design System** for UI

## Tech Stack

- [Next.js](https://nextjs.org/) - The React framework
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) - For HTTP requests
- [Carbon Design System](https://www.carbondesignsystem.com/) - For UI 
- [CarbonThemes] - (https://www.npmjs.com/package/@carbon/themes) -(https://carbon-elements.netlify.app/themes/examples/preview/)
- [SWAPI](https://swapi.dev/) - The Star Wars API for fetching data
- [Extensions] - (https://github.com/storybookjs/storybook) - this is used in Carbon Design however this project is not currently extending thta far.
- [End To End Tests] - https://playwright.dev/docs/intro going end to end testing  // boot your test - yarn playwright test - Runs the end-to-end tests

## Getting Started

Follow the instructions below to run the project locally.
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Installation