. ./.env
echo "Checking database readyness"
pg_isready -d "$DATABASE_NAME" -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT"
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT" -d "$DATABASE_NAME"  -f src/database/migrations/create_user_table.sql
