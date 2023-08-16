# Shzam 

<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3hsYzR3NGs3Njh2NmY3M2ZicXN3MW9oYXppcGNpYnV0OXV6Z3AwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FAXgrcmx38hhzL3N2Y/giphy.gif"
     alt="Markdown Monster icon"
     style="marggin-right:auto,margin-left:auto" />

This is an open-source Project that provides a starter template for building Node.js with TypeScript. The project comes with a clean folder structure, ESLint, Prettier, and Jest, making it easy for developers to write clean and maintainable code while promoting best practices for new projects.

## Getting Started
To get started with this project, follow the steps below:

1. install the package ```npm i -g shzam```
2. To create project run ``` shzam init```

## Currently supported

currently it only have 2 templates.

1. Empty Template :- This template does not include any framework; it only has basic Node.js and TypeScript configurations.

2. Nodejs/Expressjs :- This template comes with the basic configuration of Express.js and Node.js with TypeScript, along with some boilerplate code that can speed up the development process. Additionally, it also contains a test example.

## Planned For the Future

1. Graphql Support

2. prisma Support

4. module code genarotr with CRUD and test boilerplate


## Design Pattern

We are promoting the use of the 'Repository pattern'. The Node.js/Express.js example project demonstrates the use of the boilerplate, and our aim is to minimize the amount of code that programmers need to write. I have come up with this folder structure based on my experience with different frameworks that I have used.

### Folder structure 

```├── README.md
├── jest.config.ts
├── nodemon.json
├── src
│   ├── app.ts
│   ├── apps    // This were the modules goes
│   │   ├── Demo
│   │   │   ├── demo.controller.ts
│   │   │   ├── demo.router.ts
│   │   │   ├── demo.schema.ts
│   │   │   ├── index.ts
│   │   │   └── model
│   │   │       ├── index.ts
│   │   │       ├── model.ts
│   │   │       └── repository.ts
│   │   └── index.ts
│   ├── config.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   └── Logger.ts
│   ├── database.ts
│   ├── helpers
│   │   ├── asyncHandler.ts
│   │   ├── utils.ts
│   │   ├── validator.ts
│   │   └── withErrorHandling.ts
│   ├── server.ts
│   └── tests
│       ├── apps
│       │   └── demo.test.ts
│       └── setup.ts
└── tsconfig.json

```

## Features
This project starter comes with the following features:

- TypeScript: This project uses TypeScript, making it easy to write and maintain code.
- Express: This project uses Express, a popular Node.js web framework. Clean Folder Structure: The project follows a clean folder structure that makes it easy to navigate and maintain.
- ESLint: The project comes with ESLint, which helps identify and fix common code issues and maintain a consistent coding style.
- Prettier: The project comes with Prettier, which ensures code formatting is consistent across the project.
- Jest: The project comes with Jest, a popular testing framework for JavaScript. Contributing
If you would like to contribute to this project, please see the contributing guidelines.

## License
This project is licensed under [MIT licensed](LICENSE).
