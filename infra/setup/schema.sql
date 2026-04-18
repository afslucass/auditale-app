


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."word_category_enum" AS ENUM (
    'NOUN',
    'VERB',
    'ADJECTIVE',
    'ADVERB',
    'INTERJECTION',
    'PHRASAL_VERB'
);


ALTER TYPE "public"."word_category_enum" OWNER TO "postgres";

CREATE TYPE "public"."genre_enum" AS ENUM (
    "ROMANCE",
    "SCI_FI",
    "MYSTERIUM",
);


ALTER TYPE "public"."genre_enum" OWNER TO "postgres";

CREATE TYPE "public"."difficulty_enum" AS ENUM (
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
);


ALTER TYPE "public"."difficulty_enum" OWNER TO "postgres";

CREATE TYPE "public"."language_enum" AS ENUM (
    "PT_BR",
    "EN_US",
);


ALTER TYPE "public"."language_enum" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."stories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "learning_language" "public"."language_enum" NOT NULL,
    "native_language" "public"."language_enum" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "genre" "public"."genre_enum" NOT NULL,
    "duration" "text" NOT NULL,
    "free" boolean DEFAULT false NOT NULL,
    "content" "jsonb" NOT NULL,
    "difficulty" "public"."difficulty_enum" NOT NULL
);


ALTER TABLE "public"."stories" OWNER TO "postgres";


COMMENT ON TABLE "public"."stories" IS 'Stories users can hear';



CREATE TABLE IF NOT EXISTS "public"."learned_words" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "word" "text" NOT NULL,
    "language" "public"."language_enum" NOT NULL,
    "word_category" "public"."word_category_enum" NOT NULL,
    "translated_word" "text" NOT NULL,
    "translated_language" "public"."language_enum" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."learned_words" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    "paying" boolean DEFAULT false NOT NULL,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story_learned_words" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "story_id" "uuid",
    "learned_word_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "chapter_review_id" "text"
);


ALTER TABLE "public"."story_learned_words" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_learned_words" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "learned_word_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_learned_words" OWNER TO "postgres";


ALTER TABLE ONLY "public"."stories"
    ADD CONSTRAINT "Story_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."learned_words"
    ADD CONSTRAINT "learnedwords_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."story_learned_words"
    ADD CONSTRAINT "story_learned_words_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."story_learned_words"
    ADD CONSTRAINT "story_learned_words_story_id_learned_word_id_key" UNIQUE ("story_id", "learned_word_id");



ALTER TABLE ONLY "public"."user_learned_words"
    ADD CONSTRAINT "unique_user_learned_word" UNIQUE ("user_id", "learned_word_id");



ALTER TABLE ONLY "public"."user_learned_words"
    ADD CONSTRAINT "user_learned_words_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_learned_words"
    ADD CONSTRAINT "user_learned_words_user_id_learned_word_id_key" UNIQUE ("user_id", "learned_word_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."story_learned_words"
    ADD CONSTRAINT "story_learned_words_learned_word_id_fkey" FOREIGN KEY ("learned_word_id") REFERENCES "public"."learned_words"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_learned_words"
    ADD CONSTRAINT "story_learned_words_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_learned_words"
    ADD CONSTRAINT "user_learned_words_learned_word_id_fkey" FOREIGN KEY ("learned_word_id") REFERENCES "public"."learned_words"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_learned_words"
    ADD CONSTRAINT "user_learned_words_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Allow users read their own profile" ON "public"."profiles" FOR SELECT USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."user_learned_words" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable read access for all users" ON "public"."learned_words" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."story_learned_words" FOR SELECT USING (true);



CREATE POLICY "Enable read for users based on user_id" ON "public"."user_learned_words" FOR SELECT USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



ALTER TABLE "public"."stories" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."learned_words" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."story_learned_words" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "teste-policy" ON "public"."stories" FOR SELECT USING (true);



ALTER TABLE "public"."user_learned_words" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."stories" TO "anon";
GRANT ALL ON TABLE "public"."stories" TO "authenticated";
GRANT ALL ON TABLE "public"."stories" TO "service_role";



GRANT ALL ON TABLE "public"."learned_words" TO "anon";
GRANT ALL ON TABLE "public"."learned_words" TO "authenticated";
GRANT ALL ON TABLE "public"."learned_words" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."story_learned_words" TO "anon";
GRANT ALL ON TABLE "public"."story_learned_words" TO "authenticated";
GRANT ALL ON TABLE "public"."story_learned_words" TO "service_role";



GRANT ALL ON TABLE "public"."user_learned_words" TO "anon";
GRANT ALL ON TABLE "public"."user_learned_words" TO "authenticated";
GRANT ALL ON TABLE "public"."user_learned_words" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































