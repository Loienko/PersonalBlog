-- SQL Manager Lite for PostgreSQL 5.9.5.52424
-- ---------------------------------------
-- Хост         : localhost
-- База данных  : department
-- Версия       : PostgreSQL 9.6.8, compiled by Visual C++ build 1800, 64-bit



SET check_function_bodies = false;
--
-- Structure for table department (OID = 32795) :
--
SET search_path = public, pg_catalog;
CREATE TABLE public.department (
  id bigint NOT NULL,
  name_depart varchar(50) NOT NULL,
  count_employee bigint DEFAULT 0 NOT NULL
)
WITH (oids = false);
--
-- Structure for table employee (OID = 32800) :
--
CREATE TABLE public.employee (
  id bigint NOT NULL,
  id_department bigint NOT NULL,
  name varchar(50) NOT NULL,
  surname varchar(50) NOT NULL,
  date timestamp(0) without time zone DEFAULT now() NOT NULL
)
WITH (oids = false);
--
-- Definition for index department_seq (OID = 32815) :
--
CREATE INDEX department_seq ON public.department USING btree (id);
--
-- Definition for index employee_seq (OID = 32816) :
--
CREATE INDEX employee_seq ON public.employee USING btree (id);
--
-- Definition for index employee_id_dep (OID = 32822) :
--
CREATE INDEX employee_id_dep ON public.employee USING btree (id_department);
--
-- Definition for index department_pkey (OID = 32798) :
--
ALTER TABLE ONLY department
  ADD CONSTRAINT department_pkey
PRIMARY KEY (id);
--
-- Definition for index employee_pkey (OID = 32803) :
--
ALTER TABLE ONLY employee
  ADD CONSTRAINT employee_pkey
PRIMARY KEY (id);
--
-- Definition for index employee_fk (OID = 32817) :
--
ALTER TABLE ONLY employee
  ADD CONSTRAINT employee_fk
FOREIGN KEY (id_department) REFERENCES department(id) ON UPDATE CASCADE ON DELETE RESTRICT;
--
-- Comments
--
COMMENT ON SCHEMA public IS 'standard public schema';
