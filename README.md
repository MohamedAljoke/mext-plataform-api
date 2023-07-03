# Mext backend

This is the server for the mext application built with Adonis, a Node.js web framework.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Local](#local)
    - [Development](#development)
- [Deployment](#deployment)

## Getting Started

Create .env file with the .env.example

### Prerequisites

Make sure you have the following software installed before running the app:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (version 8.19.3 or higher)

## Installation

### Local

Run:

```bash
npm run local
```

### Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/adonis-backend.git

   ```

2. Install the dependencies:

   ```bash
   cd adonis-backend
   npm install

   ```

3. run the docker:

```bash
docker-compose up -d

```

5. Run database migration:
   ```bash
   node ace migration:run
   ```

## Deployment

Run:

```bash
npm run deploy
```
