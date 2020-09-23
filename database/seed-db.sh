. ./.env
echo "Checking database readyness"
pg_isready -d "$DATABASE_NAME" -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT"
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT" -d "$DATABASE_NAME"  -f database/migrations/insert_admin_user.sql