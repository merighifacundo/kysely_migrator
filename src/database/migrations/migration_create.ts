import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('digitalcard.user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('first_name', 'varchar')
    .addColumn('last_name', 'varchar')
    .addColumn('login_data', 'json')
    .addColumn('email', 'varchar', (col) => col.unique())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()

  await db.schema
    .createTable('digitalcard.card_profile')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('title', 'varchar')
    .addColumn('second_line', 'varchar')
    .addColumn('misc', 'json')
    .addColumn('user_id', 'integer', (col) =>
      col.references('digitalcard.user.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()

  await db.schema
    .createIndex('card_owner_id_index')
    .on('digitalcard.card_profile')
    .column('user_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('digitalcard.pet').execute()
  await db.schema.dropTable('digitalcard.person').execute()
}