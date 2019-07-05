-- SQL Manager Lite for PostgreSQL 5.9.5.52424
-- ---------------------------------------
-- Хост         : localhost
-- База данных  : blog
-- Версия       : PostgreSQL 9.6.8, compiled by Visual C++ build 1800, 64-bit


SET check_function_bodies = false;
--
-- Structure for table category (OID = 24578) :
--
SET search_path = public, pg_catalog;
CREATE TABLE public.category (
  id       integer           NOT NULL,
  name     varchar(25)       NOT NULL,
  url      varchar(50)       NOT NULL,
  articles integer DEFAULT 0 NOT NULL
)
WITH (oids = false
);
ALTER TABLE ONLY public.category
  ALTER COLUMN id SET STATISTICS 0;
ALTER TABLE ONLY public.category
  ALTER COLUMN name SET STATISTICS 0;
ALTER TABLE ONLY public.category
  ALTER COLUMN url SET STATISTICS 0;
ALTER TABLE ONLY public.category
  ALTER COLUMN articles SET STATISTICS 0;
--
-- Structure for table article (OID = 24586) :
--
CREATE TABLE public.article (
  id          bigint                                    NOT NULL,
  title       varchar(500)                              NOT NULL,
  url         varchar(500)                              NOT NULL,
  logo        varchar(500)                              NOT NULL,
  "desc"      varchar(500)                              NOT NULL,
  content     text                                      NOT NULL,
  id_category integer                                   NOT NULL,
  created     timestamp without time zone DEFAULT now() NOT NULL,
  views       bigint DEFAULT 0                          NOT NULL,
  comments    integer DEFAULT 0                         NOT NULL
)
WITH (oids = false
);
ALTER TABLE ONLY public.article
  ALTER COLUMN id SET STATISTICS 0;
ALTER TABLE ONLY public.article
  ALTER COLUMN title SET STATISTICS 0;
ALTER TABLE ONLY public.article
  ALTER COLUMN url SET STATISTICS 0;
ALTER TABLE ONLY public.article
  ALTER COLUMN logo SET STATISTICS 0;
--
-- Structure for table account (OID = 24597) :
--
CREATE TABLE public.account (
  id      bigint                                    NOT NULL,
  email   varchar(150)                              NOT NULL,
  name    varchar(50)                               NOT NULL,
  avatar  varchar(255),
  created timestamp without time zone DEFAULT now() NOT NULL
)
WITH (oids = false
);
--
-- Structure for table comment (OID = 24605) :
--
CREATE TABLE public.comment (
  id         bigint                                    NOT NULL,
  id_account bigint                                    NOT NULL,
  id_article bigint                                    NOT NULL,
  content    text                                      NOT NULL,
  created    timestamp without time zone DEFAULT now() NOT NULL
)
WITH (oids = false
);
--
-- Definition for sequence account_seq (OID = 24614) :
--
CREATE SEQUENCE public.account_seq
  START WITH 1
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
--
-- Definition for sequence comment_seq (OID = 24616) :
--
CREATE SEQUENCE public.comment_seq
  START WITH 1
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
--
-- Definition for index comment_idx (OID = 24633) :
--
CREATE INDEX comment_idx
  ON public.comment
  USING btree (id_article);
--
-- Definition for index article_idx (OID = 24634) :
--
CREATE INDEX article_idx
  ON public.article
  USING btree (id_category);
--
-- Definition for index comment_idx1 (OID = 24635) :
--
CREATE INDEX comment_idx1
  ON public.comment
  USING btree (id_account);
--
-- Definition for index category_pkey (OID = 24582) :
--
ALTER TABLE ONLY category
  ADD CONSTRAINT category_pkey
PRIMARY KEY (id);
--
-- Definition for index category_url_key (OID = 24584) :
--
ALTER TABLE ONLY category
  ADD CONSTRAINT category_url_key
UNIQUE (url);
--
-- Definition for index article_pkey (OID = 24595) :
--
ALTER TABLE ONLY article
  ADD CONSTRAINT article_pkey
PRIMARY KEY (id);
--
-- Definition for index account_pkey (OID = 24601) :
--
ALTER TABLE ONLY account
  ADD CONSTRAINT account_pkey
PRIMARY KEY (id);
--
-- Definition for index account_email_key (OID = 24603) :
--
ALTER TABLE ONLY account
  ADD CONSTRAINT account_email_key
UNIQUE (email);
--
-- Definition for index comment_pkey (OID = 24612) :
--
ALTER TABLE ONLY comment
  ADD CONSTRAINT comment_pkey
PRIMARY KEY (id);
--
-- Definition for index article_fk (OID = 24618) :
--
ALTER TABLE ONLY article
  ADD CONSTRAINT article_fk
FOREIGN KEY (id_category) REFERENCES category (id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- Definition for index comment_fk (OID = 24623) :
--
ALTER TABLE ONLY comment
  ADD CONSTRAINT comment_fk
FOREIGN KEY (id_account) REFERENCES account (id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- Definition for index comment_fk1 (OID = 24628) :
--
ALTER TABLE ONLY comment
  ADD CONSTRAINT comment_fk1
FOREIGN KEY (id_article) REFERENCES article (id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- Data for sequence public.account_seq (OID = 24614)
--
SELECT pg_catalog.setval('account_seq', 1, false);
--
-- Data for sequence public.comment_seq (OID = 24616)
--
SELECT pg_catalog.setval('comment_seq', 1, false);
--
-- Comments
--
COMMENT ON SCHEMA public
IS 'standard public schema';
