# tmtodos

![tmtodos.me](https://socialify.git.ci/luke-h1/tmtodos.me/image?language=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)


# Full stack todo app 
* This project consists of 2 areas: 
   * frontend - React.js frontend
   * server - Node backend


## Tech stack 

### General
- [Lerna](https://lerna.js.org/)

### Frontend
- [React](https://github.com/facebook/react)
- [ChakraUI](https://chakra-ui.com/)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Vercel](https://vercel.com/)
- [Cypress](https://www.cypress.io/)
- React context + hooks for state management

### Backend 
- [Express](https://github.com/expressjs)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [Dokku](https://dokku.com/)
- [PostgreSQL](https://www.postgresql.org/)


## Build 

[![CI / build (push / pull)](https://github.com/luke-h1/tmtodos.me/actions/workflows/build.yml/badge.svg)](https://github.com/luke-h1/tmtodos.me/actions/workflows/build.yml)

## Getting started with local development 

### Prerequisites
* This project targets Node V16. Ensure you're using Node V14 by using something such as NVM. 
* Node + NPM installed.
* Docker (responsible for running Redis & Postgres)
* run `npm ci && npm run bootstrap` in the root of the project to install dependencies 

### Backend: 
* Ensure ports `5432` & `6379` are free
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* To start redis & the postgres DB: `docker-compose up`
* to start the backend: `cd src/server && npm run prisma:migrate:dev && npm run dev`. This will run migrations & start the server

### Frontend: 
* copy the `.env.example ` to `.env.local`. `cp .env.example .env.local`. 
* run `npm run dev` to start the frontend

### Deployment 
* Backend deployment is done via Dokku & hosted on AWS. Frontend deployment is done via Vercel. Take a look at my <a href="https://lhowsam.com/blog/deploying-a-full-stack-app-via-dokku/">blog post</a> if you're interested how I deployed this project in the past

<br />
