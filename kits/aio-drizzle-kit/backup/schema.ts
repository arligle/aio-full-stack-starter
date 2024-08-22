import {
	pgTable,
	integer,
	bigint,
	varchar,
	timestamp,
	uniqueIndex,
	smallint,
	text,
	index,
	primaryKey
} from "drizzle-orm/pg-core"


export const books = pgTable("books", {
	id: integer("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
});

export const sysCaptchaLog = pgTable("sys_captcha_log", {
	id: integer("id").primaryKey().notNull(),
	userId: integer("user_id"),
	account: varchar("account", { length: 255 }),
	code: varchar("code", { length: 255 }),
	provider: varchar("provider", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const sysConfig = pgTable("sys_config", {
	id: integer("id").primaryKey().notNull(),
	key: varchar("key", { length: 50 }).notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	value: varchar("value", { length: 255 }),
	remark: varchar("remark", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
	(table) => {
		return {
			idx2C363C25Cf99Bcaab3A7F389Ba: uniqueIndex("IDX_2c363c25cf99bcaab3a7f389ba").using("btree", table.key),
		}
	});

export const sysDictType = pgTable("sys_dict_type", {
	id: integer("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	createBy: integer("create_by"),
	updateBy: integer("update_by"),
	name: varchar("name", { length: 50 }).notNull(),
	status: smallint("status").notNull(),
	remark: varchar("remark", { length: 255 }),
	code: varchar("code", { length: 50 }).notNull(),
},
	(table) => {
		return {
			idx74D0045Ff7Fab9F67Adc0B1Bda: uniqueIndex("IDX_74d0045ff7fab9f67adc0b1bda").using("btree", table.code),
		}
	});

export const sysDict = pgTable("sys_dict", {
	id: integer("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	createBy: integer("create_by").notNull(),
	updateBy: integer("update_by").notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	status: smallint("status").notNull(),
	remark: varchar("remark", { length: 255 }),
},
	(table) => {
		return {
			idxD112365748F740Ee260B65Ce91: uniqueIndex("IDX_d112365748f740ee260b65ce91").using("btree", table.name),
		}
	});

export const sysMenu = pgTable("sys_menu", {
	id: integer("id").primaryKey().notNull(),
	parentId: integer("parent_id"),
	path: varchar("path", { length: 255 }),
	name: varchar("name", { length: 255 }).notNull(),
	permission: varchar("permission", { length: 255 }),
	type: smallint("type").notNull(),
	icon: varchar("icon", { length: 255 }),
	orderNo: integer("order_no"),
	component: varchar("component", { length: 255 }),
	keepAlive: smallint("keep_alive").notNull(),
	show: smallint("show").notNull(),
	status: smallint("status").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	isExt: smallint("is_ext").notNull(),
	extOpenMode: smallint("ext_open_mode").notNull(),
	activeMenu: varchar("active_menu", { length: 255 }),
	createBy: integer("create_by"),
	updateBy: integer("update_by"),
});

export const sysRole = pgTable("sys_role", {
	id: integer("id").primaryKey().notNull(),
	value: varchar("value", { length: 255 }).notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	remark: varchar("remark", { length: 255 }),
	status: smallint("status"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	default: smallint("default"),
	createBy: integer("create_by"),
	updateBy: integer("update_by"),
},
	(table) => {
		return {
			idx05Edc0A51F41Bb16B7D8137Da9: uniqueIndex("IDX_05edc0a51f41bb16b7d8137da9").using("btree", table.value),
			idx223De54D6Badbe43A5490450C3: uniqueIndex("IDX_223de54d6badbe43a5490450c3").using("btree", table.name),
		}
	});

export const sysTask = pgTable("sys_task", {
	id: integer("id").primaryKey().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	service: varchar("service", { length: 255 }).notNull(),
	type: smallint("type").notNull(),
	status: smallint("status").notNull(),
	startTime: timestamp("start_time", { mode: 'string' }),
	endTime: timestamp("end_time", { mode: 'string' }),
	limit: integer("limit"),
	cron: varchar("cron", { length: 255 }),
	every: integer("every"),
	data: text("data"),
	jobOpts: text("job_opts"),
	remark: varchar("remark", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
	(table) => {
		return {
			idxEf8E5Ab5Ef2Fe0Ddb1428439Ef: uniqueIndex("IDX_ef8e5ab5ef2fe0ddb1428439ef").using("btree", table.name),
		}
	});

export const todo = pgTable("todo", {
	id: integer("id").primaryKey().notNull(),
	value: varchar("value", { length: 255 }).notNull(),
	userId: integer("user_id").references(() => sysUser.id),
	status: smallint("status").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
	(table) => {
		return {
			fk9Cb7989853C4Cb7Fe427Db4B260: index("FK_9cb7989853c4cb7fe427db4b260").using("btree", table.userId),
		}
	});

export const toolStorage = pgTable("tool_storage", {
	id: integer("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	fileName: varchar("file_name", { length: 200 }),
	extName: varchar("ext_name", { length: 255 }),
	path: varchar("path", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }),
	size: varchar("size", { length: 255 }),
	userId: integer("user_id"),
});

export const sysDept = pgTable("sys_dept", {
	id: integer("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	orderNo: integer("order_no"),
	mpath: varchar("mpath", { length: 255 }),
	parentId: integer("parentId"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	createBy: integer("create_by"),
	updateBy: integer("update_by"),
}
	// (table) => {
	// 	return {
	// 		fkC75280B01C49779F2323536Db67: index("FK_c75280b01c49779f2323536db67").using("btree", table.parentId),
	// 		fkC75280B01C49779F2323536Db67: foreignKey({
	// 			columns: [table.parentId],
	// 			foreignColumns: [table.id],
	// 			name: "FK_c75280b01c49779f2323536db67"
	// 		}),
	// 	}
	// 	}
);

export const sysUser = pgTable("sys_user", {
	id: integer("id").primaryKey().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	avatar: varchar("avatar", { length: 255 }),
	email: varchar("email", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	remark: varchar("remark", { length: 255 }),
	psalt: varchar("psalt", { length: 32 }).notNull(),
	status: smallint("status"),
	qq: varchar("qq", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	nickname: varchar("nickname", { length: 255 }),
	deptId: integer("dept_id").references(() => sysDept.id),
},
	(table) => {
		return {
			fk96Bde34263E2Ae3B46F011124Ac: index("FK_96bde34263e2ae3b46f011124ac").using("btree", table.deptId),
			idx9E7164B2F1Ea1348Bc0Eb0A7Da: uniqueIndex("IDX_9e7164b2f1ea1348bc0eb0a7da").using("btree", table.username),
		}
	});

export const sysLoginLog = pgTable("sys_login_log", {
	id: integer("id").primaryKey().notNull(),
	ip: varchar("ip", { length: 255 }),
	ua: varchar("ua", { length: 500 }),
	address: varchar("address", { length: 255 }),
	provider: varchar("provider", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	userId: integer("user_id").references(() => sysUser.id),
},
	(table) => {
		return {
			fk3029712E0Df6A28Edaee46Fd470: index("FK_3029712e0df6a28edaee46fd470").using("btree", table.userId),
		}
	});

export const sysTaskLog = pgTable("sys_task_log", {
	id: integer("id").primaryKey().notNull(),
	taskId: integer("task_id").references(() => sysTask.id),
	status: smallint("status").notNull(),
	detail: text("detail"),
	consumeTime: integer("consume_time"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
	(table) => {
		return {
			fkF4D9C36052Fdb188Ff5C089454B: index("FK_f4d9c36052fdb188ff5c089454b").using("btree", table.taskId),
		}
	});

export const userAccessTokens = pgTable("user_access_tokens", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	value: varchar("value", { length: 500 }).notNull(),
	expiredAt: timestamp("expired_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	userId: integer("user_id").references(() => sysUser.id),
},
	(table) => {
		return {
			fkE9D9D0C303432E4E5E48C1C3E90: index("FK_e9d9d0c303432e4e5e48c1c3e90").using("btree", table.userId),
		}
	});

export const sysDictItem = pgTable("sys_dict_item", {
	id: integer("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	createBy: integer("create_by"),
	updateBy: integer("update_by"),
	label: varchar("label", { length: 50 }).notNull(),
	value: varchar("value", { length: 50 }).notNull(),
	order: integer("order"),
	status: smallint("status").notNull(),
	remark: varchar("remark", { length: 255 }),
	typeId: integer("type_id").references(() => sysDictType.id),
	orderNo: integer("order_no"),
},
	(table) => {
		return {
			fkD68Ea74Fcb041C8Cfd1Fd659844: index("FK_d68ea74fcb041c8cfd1fd659844").using("btree", table.typeId),
		}
	});

export const userRefreshTokens = pgTable("user_refresh_tokens", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	value: varchar("value", { length: 500 }).notNull(),
	expiredAt: timestamp("expired_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	accessTokenId: varchar("access_tokenId", { length: 36 }).references(() => userAccessTokens.id),
},
	(table) => {
		return {
			rel1Dfd080C2Abf42198691B60Ae3: uniqueIndex("REL_1dfd080c2abf42198691b60ae3").using("btree", table.accessTokenId),
		}
	});

export const sysUserRoles = pgTable("sys_user_roles", {
	userId: integer("user_id").notNull().references(() => sysUser.id),
	roleId: integer("role_id").notNull().references(() => sysRole.id),
},
	(table) => {
		return {
			idx6D61C5B3F76A3419D93A421669: index("IDX_6d61c5b3f76a3419d93a421669").using("btree", table.roleId),
			idx96311D970191A044Ec048011F4: index("IDX_96311d970191a044ec048011f4").using("btree", table.userId),
			sysUserRolesPkey: primaryKey({ columns: [table.userId, table.roleId], name: "sys_user_roles_pkey" }),
		}
	});

export const sysRoleMenus = pgTable("sys_role_menus", {
	roleId: integer("role_id").notNull().references(() => sysRole.id),
	menuId: integer("menu_id").notNull().references(() => sysMenu.id),
},
	(table) => {
		return {
			idx2B95Fdc95B329D66C18F5Baed6: index("IDX_2b95fdc95b329d66c18f5baed6").using("btree", table.menuId),
			idx35Ce749B04D57E226D059E0F63: index("IDX_35ce749b04d57e226d059e0f63").using("btree", table.roleId),
			sysRoleMenusPkey: primaryKey({ columns: [table.roleId, table.menuId], name: "sys_role_menus_pkey" }),
		}
	});