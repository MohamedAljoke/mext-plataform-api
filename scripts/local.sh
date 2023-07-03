#!/bin/bash

# Start container
docker-compose up -d

# Check if MySQL is up
./scripts/mysqlConnectionCheck.sh

# Run migrations
node ace migration:run

echo "Done."
