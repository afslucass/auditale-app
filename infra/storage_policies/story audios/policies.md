# Anon users acessam apenas áudios free i2bw14_0

target roles: anon
command: SELECT
```sql
((bucket_id = 'story audios'::text) AND (auth.role() = 'anon'::text) AND (EXISTS ( SELECT 1
   FROM "Story"
  WHERE (("Story".id = (replace(objects.name, '.mp3'::text, ''::text))::uuid) AND ("Story".free = true)))))
```

# Usuários não-pagantes acessam apenas áudios free i2bw14_0

target roles: authenticated
command: SELECT
```sql
((bucket_id = 'story audios'::text) AND (auth.role() = 'authenticated'::text) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.paying = false)))) AND (EXISTS ( SELECT 1
   FROM "Story"
  WHERE (("Story".id = (replace(objects.name, '.mp3'::text, ''::text))::uuid) AND ("Story".free = true)))))
```

# Usuários pagantes acessam qualquer áudio i2bw14_0

target roles: authenticated
command: SELECT
```sql
((bucket_id = 'story audios'::text) AND (auth.role() = 'authenticated'::text) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.paying = true)))))
```