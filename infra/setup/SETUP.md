# Config DB

Ref: https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore

1. Install Postgres and psql
2. Create new Project in supabase
3. Copy Session pooler Connection String
4. Run below command to setup db (change connection string):

psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file roles.sql \
  --file schema.sql \
  --command 'SET session_replication_role = replica' \
  --file data.sql \
  --dbname "postgresql://postgres.knehbwprggmofvqbxyvw:[DB_PASSWORD]@aws-1-us-west-2.pooler.supabase.com:5432/postgres"

# Config Auth

Ref: https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=react-native#prerequisites

# Config Storage

Nothing to do