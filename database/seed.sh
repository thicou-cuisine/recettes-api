# creates api database
psql -h "$DATABASE_URL" -U "$DATABASE_USER" -p "$DATABASE_PORT"  -f database/migrations/create_database.sql
psql -h "$DATABASE_URL" -U "$DATABASE_USER" -d "$DATABASE_NAME" -p "$DATABASE_PORT"  -f database/migrations/create_user_table.sql
