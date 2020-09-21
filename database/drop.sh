# deletes api database
psql -h "$DATABASE_URL" -U "$DATABASE_USER" -p "$DATABASE_POST" -a -q -f database/migrations/drop_database.sql

