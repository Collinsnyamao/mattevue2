Ingestion Dashboard
============
[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/issues) [![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/IgorAntun/node-chat) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://igorantun.com/chat) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IgorAntun/node-chat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This is a  Vue ~ node.js  ingestion application powered by VueMatte, NodeJs + Express that provides the main functions you'd expect such as upload, error reporting, an admin system, file sorting, back ups, checksum checking etc.

---

## Features
- Material Design
- Upload for all file types
- Checksum verification
- User reporting
- Back up for files
- Sorting files for ingestion
- APIs for database control (delete, view, search, query)
- Other awesome features yet to be implemented

.
![User Features](/src/s1.jpg)

.
![Admin Features](https://imgur.com/9uo6s3z)


#### There are 2 levels:
- **Vue UI:** Can delete chat messages
- **Node processor:** The above plus the ability to kick and ban users

---

#### Requirements:
- **Mongo:** For storage
- **NodeJs:** npm/Yarn

---

## Setup

Run mongo as sudo
Clone [this](https://git.jetbrains.space/blueray/NodeJS-ingestion.git) repo to your machine

Clone the [nodes-P](https://git.jetbrains.space/blueray/NodeJS-ingestion.git) repo to your machine

1. start the mongo db daemon as sudo

```
sudo mongod
```

2. install dependencies in both repositories by running

```
npm install
```

on both directories

3. run both services

for the vue ingestion dashboard run: 
```
npm run serve
```

for the node ingestion directory

```
npm run start.
```

the last three lines are the express http server connection, the file system connection and mongodb database connection respectively

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` for nodes-P and npm run serve for IngestionDashboard to start the application. You will then be able to access it at localhost:3000

---

## License
>You can check out the full license [here]()

This project is licensed under the terms of the **MIT** license.
