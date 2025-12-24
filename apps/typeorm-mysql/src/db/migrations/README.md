# Generate migration files

npm run typeorm migration:generate apps/typeorm-mysql/src/db/migrations/user_entity_creation -- -d apps/typeorm-mysql/src/db/datasource/database.datasource.ts

# Execute migration files

npm run typeorm migration:run -- -d apps/typeorm-mysql/src/db/datasource/database.datasource.ts

# Revert migration files, run the command one by one, each command will revert the last migration

npm run typeorm migration:revert -- -d apps/typeorm-mysql/src/db/datasource/database.datasource.ts

# Status to see the past migrations that have been run

[X] = Migration has been ran

[ ] = Migration is pending/unapplied

npm run typeorm migration:show -- -d apps/typeorm-mysql/src/db/datasource/database.datasource.ts

# Faking Migrations and Rollbacks

You can also fake run a migration using the --fake flag (-f for short). This will add the migration to the migrations table without running it. This is useful for migrations created after manual changes have already been made to the database or when migrations have been run externally (e.g. by another tool or application), and you still would like to keep a consistent migration history.
