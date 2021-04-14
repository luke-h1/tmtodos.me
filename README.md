# [tmtodos.me](tmtodos.me)

![tmtodos.me](https://socialify.git.ci/luke-h1/tmtodos.me/image?language=1&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Dark)



## Full stack todo app 


## Structure: 
#

### Branches

I use git flow to manage changes made to this repository. Dev contains code merged via PRs & Main contains code that is currently running on production 


* Dev - Represents the latest code merged via PRs with succesful CI builds  

* Main - Represents the code currently deployed on production. This branch will only get updated when a production deploy happens (this branch doesn't exist yet since there have been no production releases)

### Project structure 

Currently this project consists of two areas:
* Server - Contains Graphql API & backend code 
* Client - Contains Frontend Next JS app 

<br />

This structure is currently completely seperated however I may consider using something such as yarn workspaces for this project in the future. 

## Tests 
#

[![CI / Node.js builds (push / pull)](https://github.com/luke-h1/tmtodos.me/actions/workflows/node.js.yml/badge.svg)](https://github.com/luke-h1/tmtodos.me/actions/workflows/node.js.yml)


## Tech stack 
- [React](https://github.com/facebook/react)
- [Next](https://github.com/vercel/next.js)
- [tailwind](http://tailwindcss.com/)
- [Emotion](https://github.com/emotion-js/emotion)
- [Polished](https://github.com/styled-components/polished)
- [React-icons](https://github.com/react-icons/react-icons)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Vercel](https://vercel.com/)
- [Graphql](https://graphql.org/)
- [Graphql-Codegen](https://www.graphql-code-generator.com/)
- [TypeORM](https://typeorm.io/#/)
- [DataLoader](https://github.com/graphql/dataloader)
- [Digital Ocean](https://www.digitalocean.com/)
- [Docker](https://www.docker.com/)
- [Dokku](https://dokku.com/)