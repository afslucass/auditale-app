# Anyone can upload an avatar.

target roles: all
command: INSERT
```sql
(bucket_id = 'avatars'::text)
```

# Avatar images are publicly accessible.

target roles: all
command: SELECT
```sql
(bucket_id = 'avatars'::text)
```