SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict W1PAwjlTTpTW0jHlzwH07HwPJHhXkeBIPSDopr0pcwKwLCaBMmQzeGftU4Mcwdz

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	authenticated	authenticated	afslucass@gmail.com	\N	2025-12-19 00:01:21.521923+00	\N		\N		2025-12-19 23:25:35.434206+00			\N	2026-01-30 15:09:06.060433+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "111866970117878755754", "name": "Lucas Francisco", "email": "afslucass@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL1kWhHuzvDsUAWMfxWNvrl6JxV9WwOux7wiiil5DaIKAnEgho=s96-c", "full_name": "Lucas Francisco", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL1kWhHuzvDsUAWMfxWNvrl6JxV9WwOux7wiiil5DaIKAnEgho=s96-c", "provider_id": "111866970117878755754", "email_verified": true, "phone_verified": false}	\N	2025-12-19 00:01:21.4724+00	2026-04-09 15:14:32.490017+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
111866970117878755754	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	{"iss": "https://accounts.google.com", "sub": "111866970117878755754", "name": "Lucas Francisco", "email": "afslucass@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL1kWhHuzvDsUAWMfxWNvrl6JxV9WwOux7wiiil5DaIKAnEgho=s96-c", "full_name": "Lucas Francisco", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL1kWhHuzvDsUAWMfxWNvrl6JxV9WwOux7wiiil5DaIKAnEgho=s96-c", "provider_id": "111866970117878755754", "email_verified": true, "phone_verified": false}	google	2025-12-19 00:01:21.509231+00	2025-12-19 00:01:21.509323+00	2026-01-30 15:09:06.050057+00	fdd51634-1785-421e-9873-65ebb6bad698
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
1184cf0f-360c-4308-a901-185313db31e5	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:01:21.529981+00	2025-12-19 00:01:21.529981+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
01add11d-01da-4e04-8591-734030f8ef7a	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:01:49.176551+00	2025-12-19 00:01:49.176551+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
735fa761-5b87-413d-911d-b6fe16029806	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:02:49.161332+00	2025-12-19 00:02:49.161332+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
0fbcce3b-df86-4316-bffa-0202cb327e00	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:05:37.939787+00	2025-12-19 00:05:37.939787+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
1efeb17d-f4f3-49cb-80ba-d58f0d9d5b58	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:06:19.128988+00	2025-12-19 00:06:19.128988+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
74b6eafc-bef7-4cb5-9777-06e130c59f39	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:09:05.568085+00	2025-12-19 00:09:05.568085+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
80898d5b-190e-4040-a778-3373a1e6176a	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:25:35.557954+00	2025-12-19 00:25:35.557954+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
c7e82dbe-d6f4-4558-b403-9b2a78ac8ca1	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:26:19.844302+00	2025-12-19 00:26:19.844302+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
22bac655-988b-4888-a974-7791e078c3db	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:29:10.49778+00	2025-12-19 00:29:10.49778+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
0575db71-7303-4709-bc35-6aceb81385ee	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:32:03.69126+00	2025-12-19 00:32:03.69126+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
184757ab-0923-453e-b03b-b7e5d7ed16f6	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:33:05.061106+00	2025-12-19 00:33:05.061106+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
d3b382aa-c474-4caf-9e8e-4f683ae2daa5	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 00:34:20.122585+00	2025-12-19 00:34:20.122585+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
a5b7bada-e837-482f-a7a0-84e908c68a31	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:13:39.065798+00	2025-12-19 22:13:39.065798+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
d7183538-c66f-4c73-8b52-198c2059450e	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:16:17.592319+00	2025-12-19 22:16:17.592319+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
105eff3b-ebeb-4327-b634-83a2396126fd	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:27:46.721544+00	2025-12-19 22:27:46.721544+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
071c818a-3370-44c1-a205-c78cd606f46d	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:29:30.461903+00	2025-12-19 22:29:30.461903+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
8238a58b-85ea-4839-b522-bd604c84e523	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:40:50.752396+00	2025-12-19 22:40:50.752396+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
db45894b-2412-41a0-a0ef-a2e8c52837f0	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:44:16.239233+00	2025-12-19 22:44:16.239233+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
3b7b4d84-2732-4baa-9087-f8cc0d50ce72	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 22:48:24.022988+00	2025-12-19 22:48:24.022988+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
e336f108-69e1-4d9a-9727-56878286bfff	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 23:25:51.693201+00	2025-12-19 23:25:51.693201+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
024fc50b-216b-438e-8efc-95e159a5a9e0	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 23:35:12.874022+00	2025-12-19 23:35:12.874022+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
72a875d1-c0a3-4743-803f-b676d420526c	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-19 23:46:50.715423+00	2025-12-19 23:46:50.715423+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36	191.202.101.151	\N	\N	\N	\N	\N
19f40199-0c42-4ae2-9de5-00bde53ffd5a	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2025-12-20 00:05:37.569511+00	2026-01-07 18:16:56.230003+00	\N	aal1	\N	2026-01-07 18:16:56.229891	okhttp/4.12.0	179.168.166.7	\N	\N	\N	\N	\N
16237486-0e54-4b31-8bc1-8c81f37e5514	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	2026-01-30 15:09:06.060542+00	2026-04-11 14:25:54.991205+00	\N	aal1	\N	2026-04-11 14:25:54.9911	okhttp/4.12.0	191.202.103.161	\N	\N	\N	\N	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
1184cf0f-360c-4308-a901-185313db31e5	2025-12-19 00:01:21.569881+00	2025-12-19 00:01:21.569881+00	oauth	c8f76d87-3a94-4c81-b01d-f2d69a70e6b9
01add11d-01da-4e04-8591-734030f8ef7a	2025-12-19 00:01:49.179292+00	2025-12-19 00:01:49.179292+00	oauth	a5a315c4-ee2e-4faa-92f3-9cd84adce345
735fa761-5b87-413d-911d-b6fe16029806	2025-12-19 00:02:49.193198+00	2025-12-19 00:02:49.193198+00	oauth	8b56f7c0-d255-4f2d-be90-02a44dc485cc
0fbcce3b-df86-4316-bffa-0202cb327e00	2025-12-19 00:05:37.949877+00	2025-12-19 00:05:37.949877+00	oauth	8d87cbba-0a68-4c16-94fd-52a7aa39cd8e
1efeb17d-f4f3-49cb-80ba-d58f0d9d5b58	2025-12-19 00:06:19.131287+00	2025-12-19 00:06:19.131287+00	oauth	731f7746-6931-466e-b701-e8a73c8ef754
74b6eafc-bef7-4cb5-9777-06e130c59f39	2025-12-19 00:09:05.571954+00	2025-12-19 00:09:05.571954+00	oauth	3701e0e6-cc50-4ed9-bd45-9600c6cc7221
80898d5b-190e-4040-a778-3373a1e6176a	2025-12-19 00:25:35.59065+00	2025-12-19 00:25:35.59065+00	oauth	2c49a623-f9a3-4fb2-96ca-06e03afa226a
c7e82dbe-d6f4-4558-b403-9b2a78ac8ca1	2025-12-19 00:26:19.846968+00	2025-12-19 00:26:19.846968+00	oauth	c8bf7aa6-b35f-4f01-a4ca-1d5fdb2f70f3
22bac655-988b-4888-a974-7791e078c3db	2025-12-19 00:29:10.501854+00	2025-12-19 00:29:10.501854+00	oauth	f894c727-051f-40cf-8e21-17fe9f2bdfb6
0575db71-7303-4709-bc35-6aceb81385ee	2025-12-19 00:32:03.704236+00	2025-12-19 00:32:03.704236+00	oauth	41f3c76f-5cda-40cb-9970-7b2a33d4c5f9
184757ab-0923-453e-b03b-b7e5d7ed16f6	2025-12-19 00:33:05.065075+00	2025-12-19 00:33:05.065075+00	oauth	9abec13f-88bb-442b-b126-fe3b3502d6f9
d3b382aa-c474-4caf-9e8e-4f683ae2daa5	2025-12-19 00:34:20.126305+00	2025-12-19 00:34:20.126305+00	oauth	8d3015f9-ed1c-43f1-858e-69425e29deb1
a5b7bada-e837-482f-a7a0-84e908c68a31	2025-12-19 22:13:39.102151+00	2025-12-19 22:13:39.102151+00	oauth	9f54024b-fdf1-4c42-bca7-be99e8444aa3
d7183538-c66f-4c73-8b52-198c2059450e	2025-12-19 22:16:17.607042+00	2025-12-19 22:16:17.607042+00	oauth	8a8be924-bba8-4ae3-80b6-f50225c01c0c
105eff3b-ebeb-4327-b634-83a2396126fd	2025-12-19 22:27:46.743182+00	2025-12-19 22:27:46.743182+00	oauth	21e836d0-3446-45f2-ab17-688dad082717
071c818a-3370-44c1-a205-c78cd606f46d	2025-12-19 22:29:30.466478+00	2025-12-19 22:29:30.466478+00	oauth	1b423477-b85b-4956-b516-da6c91dfd783
8238a58b-85ea-4839-b522-bd604c84e523	2025-12-19 22:40:50.76798+00	2025-12-19 22:40:50.76798+00	oauth	263bf922-c686-4f4f-96cb-6c60b2538137
db45894b-2412-41a0-a0ef-a2e8c52837f0	2025-12-19 22:44:16.242659+00	2025-12-19 22:44:16.242659+00	oauth	da28ea17-66f3-481b-aeef-42b79f12fad3
3b7b4d84-2732-4baa-9087-f8cc0d50ce72	2025-12-19 22:48:24.028898+00	2025-12-19 22:48:24.028898+00	oauth	722d3174-6d57-455f-873d-5643e01d7a1b
e336f108-69e1-4d9a-9727-56878286bfff	2025-12-19 23:25:51.715745+00	2025-12-19 23:25:51.715745+00	otp	8abb9bf0-a341-432c-aa1e-90d224263b46
024fc50b-216b-438e-8efc-95e159a5a9e0	2025-12-19 23:35:12.904495+00	2025-12-19 23:35:12.904495+00	oauth	d85d3bf6-2155-464c-a59d-e6e240f98fdf
72a875d1-c0a3-4743-803f-b676d420526c	2025-12-19 23:46:50.739063+00	2025-12-19 23:46:50.739063+00	oauth	9be9bb9f-9a3d-41b7-80db-ffd38df8168f
19f40199-0c42-4ae2-9de5-00bde53ffd5a	2025-12-20 00:05:37.598087+00	2025-12-20 00:05:37.598087+00	oauth	345cc096-46c1-4369-bb8f-e32ddb6e75fb
16237486-0e54-4b31-8bc1-8c81f37e5514	2026-01-30 15:09:06.09984+00	2026-01-30 15:09:06.09984+00	oauth	8023f536-c723-4267-bf60-b182c72c12e1
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	1	jgm4obmwtkjo	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:01:21.544195+00	2025-12-19 00:01:21.544195+00	\N	1184cf0f-360c-4308-a901-185313db31e5
00000000-0000-0000-0000-000000000000	2	456wgfjrbsji	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:01:49.177803+00	2025-12-19 00:01:49.177803+00	\N	01add11d-01da-4e04-8591-734030f8ef7a
00000000-0000-0000-0000-000000000000	3	u3ty2ycnqsav	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:02:49.177273+00	2025-12-19 00:02:49.177273+00	\N	735fa761-5b87-413d-911d-b6fe16029806
00000000-0000-0000-0000-000000000000	4	ja7342cl2acj	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:05:37.947077+00	2025-12-19 00:05:37.947077+00	\N	0fbcce3b-df86-4316-bffa-0202cb327e00
00000000-0000-0000-0000-000000000000	5	y5lhbpwiqkjr	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:06:19.13009+00	2025-12-19 00:06:19.13009+00	\N	1efeb17d-f4f3-49cb-80ba-d58f0d9d5b58
00000000-0000-0000-0000-000000000000	6	tqsveev7dfl4	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:09:05.569856+00	2025-12-19 00:09:05.569856+00	\N	74b6eafc-bef7-4cb5-9777-06e130c59f39
00000000-0000-0000-0000-000000000000	7	hvwucid7acrz	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:25:35.577659+00	2025-12-19 00:25:35.577659+00	\N	80898d5b-190e-4040-a778-3373a1e6176a
00000000-0000-0000-0000-000000000000	8	fqf7sv3jg5er	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:26:19.845551+00	2025-12-19 00:26:19.845551+00	\N	c7e82dbe-d6f4-4558-b403-9b2a78ac8ca1
00000000-0000-0000-0000-000000000000	9	j56bpvhot26j	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:29:10.499742+00	2025-12-19 00:29:10.499742+00	\N	22bac655-988b-4888-a974-7791e078c3db
00000000-0000-0000-0000-000000000000	10	q72na5tsd3rx	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:32:03.69993+00	2025-12-19 00:32:03.69993+00	\N	0575db71-7303-4709-bc35-6aceb81385ee
00000000-0000-0000-0000-000000000000	11	vikgiuddwnf5	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:33:05.062775+00	2025-12-19 00:33:05.062775+00	\N	184757ab-0923-453e-b03b-b7e5d7ed16f6
00000000-0000-0000-0000-000000000000	12	xfqlndtszi5v	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 00:34:20.124253+00	2025-12-19 00:34:20.124253+00	\N	d3b382aa-c474-4caf-9e8e-4f683ae2daa5
00000000-0000-0000-0000-000000000000	13	n7g2p2ge6p2f	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:13:39.087396+00	2025-12-19 22:13:39.087396+00	\N	a5b7bada-e837-482f-a7a0-84e908c68a31
00000000-0000-0000-0000-000000000000	14	rq52cbpishan	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:16:17.600071+00	2025-12-19 22:16:17.600071+00	\N	d7183538-c66f-4c73-8b52-198c2059450e
00000000-0000-0000-0000-000000000000	15	73j7tnuvhnyo	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:27:46.731946+00	2025-12-19 22:27:46.731946+00	\N	105eff3b-ebeb-4327-b634-83a2396126fd
00000000-0000-0000-0000-000000000000	16	3vpwsf5migak	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:29:30.463475+00	2025-12-19 22:29:30.463475+00	\N	071c818a-3370-44c1-a205-c78cd606f46d
00000000-0000-0000-0000-000000000000	17	ynljb57w5swr	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:40:50.758007+00	2025-12-19 22:40:50.758007+00	\N	8238a58b-85ea-4839-b522-bd604c84e523
00000000-0000-0000-0000-000000000000	18	by7hywveeoni	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:44:16.240697+00	2025-12-19 22:44:16.240697+00	\N	db45894b-2412-41a0-a0ef-a2e8c52837f0
00000000-0000-0000-0000-000000000000	19	ir7dt7jcfagr	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 22:48:24.026137+00	2025-12-19 22:48:24.026137+00	\N	3b7b4d84-2732-4baa-9087-f8cc0d50ce72
00000000-0000-0000-0000-000000000000	20	wriomrrhie3o	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 23:25:51.707092+00	2025-12-19 23:25:51.707092+00	\N	e336f108-69e1-4d9a-9727-56878286bfff
00000000-0000-0000-0000-000000000000	21	zitwfina76u6	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 23:35:12.891399+00	2025-12-19 23:35:12.891399+00	\N	024fc50b-216b-438e-8efc-95e159a5a9e0
00000000-0000-0000-0000-000000000000	22	ecri2bzpuydl	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2025-12-19 23:46:50.728007+00	2025-12-19 23:46:50.728007+00	\N	72a875d1-c0a3-4743-803f-b676d420526c
00000000-0000-0000-0000-000000000000	23	tdvfxnoaskmn	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2025-12-20 00:05:37.582866+00	2025-12-23 22:21:20.864955+00	\N	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	24	etcjdkolahjx	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2025-12-23 22:21:20.893459+00	2025-12-23 23:19:22.90417+00	tdvfxnoaskmn	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	25	scvnsyw7hxwy	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2025-12-23 23:19:22.929942+00	2025-12-29 13:12:17.034847+00	etcjdkolahjx	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	26	rr2qmf6f67e6	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2025-12-29 13:12:17.058981+00	2026-01-05 22:17:44.308475+00	scvnsyw7hxwy	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	27	rwcdqoldnzrp	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-01-05 22:17:44.313236+00	2026-01-07 18:16:56.17403+00	rr2qmf6f67e6	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	28	ucow4dsnbq6f	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-01-07 18:16:56.1999+00	2026-01-07 18:20:28.481826+00	rwcdqoldnzrp	19f40199-0c42-4ae2-9de5-00bde53ffd5a
00000000-0000-0000-0000-000000000000	29	w4moulgi7vhc	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-01-30 15:09:06.079874+00	2026-02-12 18:14:21.358116+00	\N	16237486-0e54-4b31-8bc1-8c81f37e5514
00000000-0000-0000-0000-000000000000	30	zcljkjp2kqgr	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-02-12 18:14:21.375073+00	2026-04-07 22:07:39.130327+00	w4moulgi7vhc	16237486-0e54-4b31-8bc1-8c81f37e5514
00000000-0000-0000-0000-000000000000	31	c3pketnimfe3	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-04-07 22:07:39.158362+00	2026-04-07 23:49:50.949686+00	zcljkjp2kqgr	16237486-0e54-4b31-8bc1-8c81f37e5514
00000000-0000-0000-0000-000000000000	32	yz5u4xr4pt53	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-04-07 23:49:50.975067+00	2026-04-08 01:45:44.492024+00	c3pketnimfe3	16237486-0e54-4b31-8bc1-8c81f37e5514
00000000-0000-0000-0000-000000000000	33	yuhupkmyvqla	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	t	2026-04-08 01:45:44.512+00	2026-04-09 15:14:32.447673+00	yz5u4xr4pt53	16237486-0e54-4b31-8bc1-8c81f37e5514
00000000-0000-0000-0000-000000000000	34	w733lqiqngdt	dbe4ea9b-f848-4370-ac71-8f1e1b890b36	f	2026-04-09 15:14:32.476901+00	2026-04-09 15:14:32.476901+00	yuhupkmyvqla	16237486-0e54-4b31-8bc1-8c81f37e5514
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "updated_at", "username", "full_name", "avatar_url", "website", "paying") FROM stdin;
dbe4ea9b-f848-4370-ac71-8f1e1b890b36	\N	\N	Lucas Francisco	https://lh3.googleusercontent.com/a/ACg8ocL1kWhHuzvDsUAWMfxWNvrl6JxV9WwOux7wiiil5DaIKAnEgho=s96-c	\N	f
\.

--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
avatars	avatars	\N	2025-12-18 22:33:36.240269+00	2025-12-18 22:33:36.240269+00	f	f	\N	\N	\N	STANDARD
story thumbnails	story thumbnails	\N	2026-01-21 23:24:14.112721+00	2026-01-21 23:24:14.112721+00	t	f	\N	{image/png,image/jpeg}	\N	STANDARD
story audios	story audios	\N	2025-12-24 15:34:00.964027+00	2025-12-24 15:34:00.964027+00	f	f	\N	\N	\N	STANDARD
learned words audios	learned words audios	\N	2026-01-29 14:32:04.804728+00	2026-01-29 14:32:04.804728+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 34, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict W1PAwjlTTpTW0jHlzwH07HwPJHhXkeBIPSDopr0pcwKwLCaBMmQzeGftU4Mcwdz

RESET ALL;
