import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

type Role = 'ADMIN' | 'USER';

const timestamps = {
	createdAt: integer({ mode: 'timestamp' }).$default(() => new Date()),
	updatedAt: integer({ mode: 'timestamp' })
		.$default(() => new Date())
		.$onUpdate(() => new Date())
};

export const user = sqliteTable('user', {
	id: text().primaryKey(),
	email: text().notNull().unique(),
	role: text().$type<Role>().notNull().default('USER'),
	username: text().notNull().unique(),
	...timestamps
});

export const session = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => user.id),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	...timestamps
});

export const account = sqliteTable(
	'account',
	{
		id: text().primaryKey(),
		providerName: text().notNull(),
		providerId: text().notNull(),
		userId: text()
			.notNull()
			.references(() => user.id),
		...timestamps
	},
	(t) => ({
		unique_provider: unique().on(t.providerName, t.providerId)
	})
);

export type InsertSession = typeof session.$inferInsert;
export type User = typeof user.$inferSelect;
