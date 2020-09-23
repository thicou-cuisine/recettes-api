. ./.env
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT"  -f database/migrations/create_database.sql
