<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
An implementation of a small subset of the capabilities of the Hacker News Algolia API. New Items are retrieved every hour from the main HN API.  

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Local

```bash
$ npm install
```

Docker container

```bash
# Bundled with a postgresql database
$ docker compose -f "docker-compose.yml" up --build
```

## Running the app

```bash
# docker
$  docker compose -f "docker-compose.yml" up
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Postman

A Postman collection and enviroment are provided inside the postman forder for easy of use

# Usage with Postman

All endpoints require a Bearer token to be used, to obtain a token:

1. In postman set the api enviroment variable to the appropiate URL, by default it'll be localhost:3000 unless changed by the .env files
2. Import the Collection and enviroment files from the postman folder into Postman
3. Inside the collection run the login request, it will return a JWT auth token. The default body of the request must be:

```json
// This user is seeded on to the DB by default
{
  "email": "example@reign.cl",
  "password": "password"
}
```

4. Put the received token on the postman's jwt enviroment variable
5. All the other endpoints are ready to be used

## Notes

- The API Docs are available at /api/docs
- The .env files are included in the repository only to aid the ease of use, I undestand is a bad practice to do so.
- One thing I'd have liked to do would be to implement the complex tags filtering from the Algolia API, I did not have enough time this weekend.
- An Online version of this API is available at my personal site http://www.servinges.cl/hacker-news/ because I wanted to demostrate that I have some knowledge about web servers configuration (nginx), ec2, web hosting, etc. 

## License

Nest is [MIT licensed](LICENSE).
