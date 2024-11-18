# NestJs REST API Demo 

This project was made using typescript, node and postgres. It leverages the use of the [nestjs](https://docs.nestjs.com/), [docker](https://docs.docker.com/) and [prisma](https://www.prisma.io/docs) frameworks.

### Run the API in development mode
```javascript
npm i // install
npm run db:dev:restart // start postgres in docker and push migrations
npm run start:dev // start api in dev mode
npm run test:e2e // runs through a basic end to end suite with 17 tests associated with auth, user and bookmark actions
```
### Run the end to end test suite
```javascript 
npm run test:e2e // includes 17 tests associated with auth, user, and bookmark actons
```
Created with help from [this tutorial](https://github.com/vladwulf/nestjs-api-tutorial/blob/main/README.md?plain=1) by [vladwulf](https://github.com/vladwul)

He has a [youtube channel](https://www.youtube.com/@CodeWithVlad) with heaps of useful videos on NestJs, React and Prisma.


