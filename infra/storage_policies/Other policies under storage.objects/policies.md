# Anyone can update their own avatar.

target roles: all
command: UPDATE
USING exp:
```sql
(( SELECT auth.uid() AS uid) = owner)
```
WITH CHECK exp:
```sql
(bucket_id = 'avatars'::text)
```