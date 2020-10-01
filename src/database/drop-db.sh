. ./.env
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_POST" -a -q -f src/database/migrations/drop_database.sql

