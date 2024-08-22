import {
  pgTable,
  varchar,
  timestamp,
  smallint,
  uuid,
  integer
} from "drizzle-orm/pg-core"


export const books = pgTable("books", {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const sysUser = pgTable("sys_user", {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  remark: varchar("remark", { length: 255 }),
  psalt: varchar("psalt", { length: 32 }).notNull(),
  status: smallint("status"),
  qq: varchar("qq", { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  nickname: varchar("nickname", { length: 255 }),
});
// 公司（corporation company）
export const sysCorp = pgTable("sys_corp", {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const sysDept = pgTable("sys_dept", {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  orderNo: integer("order_no"),
  mpath: varchar("mpath", { length: 255 }),
  parentId: integer("parent_id"),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  createBy: integer("create_by"),
  updateBy: integer("update_by"),
});