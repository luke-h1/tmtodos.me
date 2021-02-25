# take my notes Contribution Guide



## Community


Please, keep discussions in issues and pull requests positive, productive, and respectful. We're all humans afterall.

## Ground Rules

### Git workflow

The main branch is dev, where all ongoing development work converges. The main branch is reserved for more polished version of the project.

To get all setup, fork this repo and do all of your work there.

When working on something, create a new branch from dev, and make a PR back into the dev branch in the main repo.


Sometimes your local changes can become out of date (due to changes made to the upstream repo). So it's a good idea to try to keep your branch up-to-date by rebasing it on top of the latest changes on dev 


Try to not let your work get stale and out of date. The best approach is to make smaller PRs: for example, laying some foundation for a feature, or refactoring, can be PR'd before continuing further with feature development.

### Making a PR

Before making a PR, ensure all files are linted according to our eslint configuration and tests pass locally(not yet setup, but soon).

When making a PR, add a meaningful title and description. And fill the auto-generated PR template as best as you can.

If any development is done on the UI (additions or non-trivial changes), please include a screenshot of the change.


### Bugs or Features?

Create a new issue to report bugs and propose features if a similar issue has not already been opened.

When opening a new issue for a bug, add a title and a clear description with code samples or an executable test case demonstrating the issue.

## The project

## Tech Stack: 


### Frontend 
- [React](https://github.com/facebook/react)
- [Next](https://github.com/vercel/next.js) - For Frontend 
- [typescript](https://github.com/Microsoft/TypeScript) - For typing 
- [ChakraUI](https://chakra-ui.com/) - For the majority of styling 
- [emotion](https://github.com/emotion-js/emotion) - For custom components 
- [polished](https://github.com/styled-components/polished)
- [react-icons](https://github.com/react-icons/react-icons) - For icons 
- [vercel](https://vercel.com/) - Host the frontend 

### Backend 
- [MongoDB](https://www.mongodb.com/) - Database 
- [Helmet](https://helmetjs.github.io/) - Security headers 
- [colors](https://github.com/marak/colors.js/) - Colors in terminal 
- [jsonwebtoken](https://jwt.io/) - Auth 
- [mongoose](https://mongoosejs.com/) - Mongoose for interacting with MongoDB 
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - for hashing passwords
- [nodemailer](https://nodemailer.com/about/) - for sending emails (eventually)
- [express](http://expressjs.com/) 
- [nodeJS](https://nodejs.org/en/)
- [Heroku](https://www.heroku.com/) - For hosting backend in development environment 
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - for hosting database in development environment 



Almost all of the code you'll touch in this codebase will be Typescript or JavaScript

### Third-party dependencies

The intention is to keep the amount of third-party dependencies to a minimum. However, it's better to add a dependency rather than write or copy over untested code. 

## First Time Setup

Please refer to the [README](https://github.com/luke-h1/take-my-notes.com/blob/main/README.md)

## Conclusion

Hopefully this document has given you an introduction to the project. Feel free to submit Pull Requests to improve this document.

Looking forward to your contributions! 🙌

## License

To be discussed