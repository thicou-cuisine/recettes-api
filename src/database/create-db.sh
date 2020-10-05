#!/usr/bin/env bash
. ./.env
psql -h "$DATABASE_ADDRESS" -U "$DATABASE_USER" -p "$DATABASE_PORT"  -f src/database/migrations/create_database.sql
