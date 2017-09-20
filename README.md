## Massdrop Coding Challenge

By Alexander Chang

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [webpack CLI](https://webpack.js.org/guides/installation/)

* Globally installed [mongoDB](https://docs.mongodb.com/manual/installation/#tutorials)

### 2. Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/awchang56/massdrop.git && cd massdrop

$ mkdir database/data/db

$ yarn install
```

```sh
$ npm run build

$ npm run server-start

$ npm run db-start
```
### 3. Tech Stack

* React
  I used React in this project because of its re-rendering efficiency and flexibility. I also chose React for its ease of use when controlling state. I did not have to do significant data modeling in this application, so Redux was not necessary. React, being primarily the View component of a MVC app, was sufficient for an app like this.
* Node/Express
  I chose Node/Express to take advantage of Node's native non-blocking I/O. This is not a processor intensive app, like a gaming application. Also Node is significantly easier to scale than Rails because of its blazing processing speed. It also allows for easier development, since both front and back end are written in the same language.
* Mongoose/MongoDB
  I chose Mongoose/MongoDB because the data that needs to be stored is not relational. Speed was key here and NOSQL databases, like MongoDB, are quicker than their counterparts. While it is possible with a NOSQL database to lose a document, since the data in this app is not extremely sensitive, I traded a potential accuracy hit for speed.
* Semantic UI React
  I used Semantic UI React for its easy integration into React. It allows for easy development, as it is component driven, and seamlessly integrates with React's JSX.