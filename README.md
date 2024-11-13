# Getting started
1. Setup environmental variables (in `.env` file)
1. Initialize database, start server to apply data schemas (for now we don't use migrations until we have stable db structure and production version in order and not to create a lot of meaningless migrations)
1. Start docker container for local development (`docker compose up` to start database)
1. Start server to create db schema `npm run star:dev`
1. Run seeder for quick start `npm run db:seed`
1. You are good to go, db is initialized

# Generating migrations

Run 

```npm run migration:create --name=test```

to create blank migraiton file or

```npm run migration:generate --name=test```

to create migration based on your current db state

where `name` is the name of migration