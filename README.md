This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
ou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
# JAWA TRADERS SPA - A Star Wars Starship Browser for all you future starship traders ( droids welcome )

This is a Single Page Application (SPA) built using **Next.js** and **TypeScript** that fetches and displays Star Wars starships from the **Star Wars API (SWAPI)**. The app allows users to browse a list of starships, view details, adjust quantities, and add items to their basket. Pagination is also implemented to browse through starship categories , and a search + experinmental video backrround swticher that switches with the theme swticher not finished but scoped of what could be done in 48hrs 2 evenings as familiy first folks  normally design hat on then feed code pixel perfect from figma or xd in this case ive focused all time on development and how far it can be pushed in a short space of time( design concept found below and reasons why what is used).

## LIVE URL
- View live at (https://jawa-traders.vercel.app)


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
- [Extensions] - (https://github.com/storybookjs/storybook) - this is used in Carbon Design however this project is not currently extending that far.
- [End To End Tests] - https://playwright.dev/docs/intro going end to end testing  // boot your test - yarn playwright test - Runs the end-to-end tests

## Choice of Stack

- Typescript/Next.js for Type Checking, Reduced Runtime Errors()- makes sense for readbility for future devs, scalability and null and undefined scenarios
- Next.js for levee things like Hybrid Rendering, hot reloading spa out the box and post.css ow and for more load speed static site generation
- Axios asyn more readable and manageable period
- Carbon Design System - part of the brief its new to me.

## Design

- This breif was a development first brief in 48hrs ( design can be found in /public/fig feel free to extend and contribute as in design mode not development mode :) happy coding people your feel free to use this work.

### A TO B Testing /Unit Testing 

[End To End Tests] - https://playwright.dev/docs/intro going end to end testing  
- To Run your test - yarn playwright test - playwright will send you instrctions to see report - note you will need to open another cmd window or terminal if your are running in localhost.

### Installation
- git clone (https://github.com/beestinger72/JawaTraders)
- yarn install 
- yarn run dev

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

or View live at (https://jawa-traders.vercel.app)

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Notes

- 48hrs on weekend - There are some discrepancies in mobile mode due to learning carbon system on the fly in less that 10 hours building everything else up form scratch im aware of, normally i would add a tone of interactive animation and use well a better component library then extend/customise to be honest.. cross browser check and then would extend the unit testing/ enduser testing hook upto browserstack and automate - also i would have loved to animate the svg logo no time left sorry.

