import { Migrator, MigrationProvider, Migration } from 'kysely'
import { instanceOfDB } from './db';
import * as migration from './migrations/migration_create';


class ClassMigrationProvider implements  MigrationProvider {
    async getMigrations(): Promise<Record<string, Migration>> {
        const migrations: Record<string, Migration> = {}
        migrations["migration"] = migration;
        return migrations;
    }
}

const runMigrations = async () => {
    const db = instanceOfDB();
    const migrator = new Migrator({
        db,
        migrationTableSchema: 'digitalcard',
        provider: new ClassMigrationProvider()
    })
    return await migrator.migrateUp();
}

export default runMigrations;