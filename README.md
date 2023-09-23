
## Description

 This is a service developed with [Nest](https://github.com/nestjs/nest) Framework with the purpose of managing order orders, items and tracking the status of orders with two reports


## Requirements

- [Node](https://nodejs.org/)
- [Npm](https://www.npmjs.com/) (preferably) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

## Installation
You just have to run the docker command since the API and the database are in dockerized environments.
```bash
$ npm install
```

## Running the app

```bash
# Docker (recomended)
$ docker compose build
$ docker compose up
```

## Test

```bash
# unit test event
$ npx jest event.service.spec.ts
$ npx jest event.controller.spec.ts

# unit test users
$ npx jest users.service.spec.ts
$ npx jest users.controller.spec.ts

# test coverage
$ npm run test:cov
```

## Swagger
### `/docs`
Items Module
![img](docs/items.png)
Orders Module
![img](docs/orders.png)
Reports Module
![img](docs/reports.png)



