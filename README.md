# [tmtodos.me](tmtodos.me)

![tmtodos.me](https://socialify.git.ci/luke-h1/tmtodos.me/image?language=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)

## Full stack todo app 


## Getting started with local development 


### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure Postgres is installed & is running (see backend section for more details)
* Ensure Redis is installed & is running (see backend section for more details)
* Ensure your postgres user has superuser access on the `tmtodos` DB

### Backend: 
* [Install postgres](https://www.postgresql.org/download/)
* [Install Redis (stable)](https://redis.io/download)
* Create a blank postgres database called `tmtodos`
* run `npm ci && npm run bootstrap` in the root of the project to install dependencies 
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* to start the backend: `cd src/tm-server && npm run watch`. This will transpile Typescript down to common JS. Run `npm run dev` to start the backend server. 

### Frontend: 
* copy the `.env.example ` to `.env`. `cp .env.example .env`. 
* Fill out the `.env` file with your own values
* run `npm run dev` to start the frontend


### Running backend Migrations 
* The backend contains 2 commands which are responsible for dealing with migrations. 
* The first one is responsible for generating a migration based on changes made to the `entities` folder. `typeorm migration:generate -n <NAME>`. 
* The second one is responsible for running the generated migrations. `typeorm migration:run`

### Deployment 
* Deployment is done via Dokku. See <a href="https://lhowsam.com/blog/deploying-a-full-stack-app-via-dokku/" target="_blank">if you're interested on how I deployed this project </a>

<br />

## Tech stack 

### Frontend
- [React](https://github.com/facebook/react)
- [Next](https://github.com/vercel/next.js)
- [tailwind](http://tailwindcss.com/)
- [Emotion](https://github.com/emotion-js/emotion)
- [Polished](https://github.com/styled-components/polished)
- [React-icons](https://github.com/react-icons/react-icons)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Vercel](https://vercel.com/)
- [Graphql-Codegen](https://www.graphql-code-generator.com/)
- [Cypress](https://www.cypress.io/)


### Backend 
- [Graphql](https://graphql.org/)
- [TypeORM](https://typeorm.io/#/)
- [DataLoader](https://github.com/graphql/dataloader)
- [Digital Ocean](https://www.digitalocean.com/)
- [Docker](https://www.docker.com/)
- [Dokku](https://dokku.com/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Tests 


[![CI / Node.js builds (push / pull)](https://github.com/luke-h1/tmtodos.me/actions/workflows/node.js.yml/badge.svg)](https://github.com/luke-h1/tmtodos.me/actions/workflows/node.js.yml)

[![CI / typecheck (push / pull)](https://github.com/luke-h1/tmtodos.me/actions/workflows/typecheck.yml/badge.svg)](https://github.com/luke-h1/tmtodos.me/actions/workflows/typecheck.yml)

