# Migration `20200427080534-add_task_category`

This migration has been generated by Matt Wood at 4/27/2020, 8:05:34 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ADD COLUMN "category" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200426143701-add_task_created_at..20200427080534-add_task_category
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -21,5 +21,6 @@
   name         String
   completed_at DateTime?
   created_at   DateTime  @default(now())
   userId       Int?
+  category     String?
 }
```