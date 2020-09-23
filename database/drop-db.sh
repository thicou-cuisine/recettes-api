. ./.env
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_POST" -a -q -f database/migrations/drop_database.sql

