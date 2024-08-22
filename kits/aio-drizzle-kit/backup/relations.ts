import { relations } from "drizzle-orm/relations";
import { sysUser, todo, sysDept, sysLoginLog, sysTask, sysTaskLog, userAccessTokens, sysDictType, sysDictItem, userRefreshTokens, sysRole, sysUserRoles, sysMenu, sysRoleMenus } from "../drizzle/schema";

export const todoRelations = relations(todo, ({ one }) => ({
	sysUser: one(sysUser, {
		fields: [todo.userId],
		references: [sysUser.id]
	}),
}));

export const sysUserRelations = relations(sysUser, ({ one, many }) => ({
	todos: many(todo),
	sysDept: one(sysDept, {
		fields: [sysUser.deptId],
		references: [sysDept.id]
	}),
	sysLoginLogs: many(sysLoginLog),
	userAccessTokens: many(userAccessTokens),
	sysUserRoles: many(sysUserRoles),
}));

export const sysDeptRelations = relations(sysDept, ({ one, many }) => ({
	sysDept: one(sysDept, {
		fields: [sysDept.parentId],
		references: [sysDept.id],
		relationName: "sysDept_parentId_sysDept_id"
	}),
	sysDepts: many(sysDept, {
		relationName: "sysDept_parentId_sysDept_id"
	}),
	sysUsers: many(sysUser),
}));

export const sysLoginLogRelations = relations(sysLoginLog, ({ one }) => ({
	sysUser: one(sysUser, {
		fields: [sysLoginLog.userId],
		references: [sysUser.id]
	}),
}));

export const sysTaskLogRelations = relations(sysTaskLog, ({ one }) => ({
	sysTask: one(sysTask, {
		fields: [sysTaskLog.taskId],
		references: [sysTask.id]
	}),
}));

export const sysTaskRelations = relations(sysTask, ({ many }) => ({
	sysTaskLogs: many(sysTaskLog),
}));

export const userAccessTokensRelations = relations(userAccessTokens, ({ one, many }) => ({
	sysUser: one(sysUser, {
		fields: [userAccessTokens.userId],
		references: [sysUser.id]
	}),
	userRefreshTokens: many(userRefreshTokens),
}));

export const sysDictItemRelations = relations(sysDictItem, ({ one }) => ({
	sysDictType: one(sysDictType, {
		fields: [sysDictItem.typeId],
		references: [sysDictType.id]
	}),
}));

export const sysDictTypeRelations = relations(sysDictType, ({ many }) => ({
	sysDictItems: many(sysDictItem),
}));

export const userRefreshTokensRelations = relations(userRefreshTokens, ({ one }) => ({
	userAccessToken: one(userAccessTokens, {
		fields: [userRefreshTokens.accessTokenId],
		references: [userAccessTokens.id]
	}),
}));

export const sysUserRolesRelations = relations(sysUserRoles, ({ one }) => ({
	sysRole: one(sysRole, {
		fields: [sysUserRoles.roleId],
		references: [sysRole.id]
	}),
	sysUser: one(sysUser, {
		fields: [sysUserRoles.userId],
		references: [sysUser.id]
	}),
}));

export const sysRoleRelations = relations(sysRole, ({ many }) => ({
	sysUserRoles: many(sysUserRoles),
	sysRoleMenus: many(sysRoleMenus),
}));

export const sysRoleMenusRelations = relations(sysRoleMenus, ({ one }) => ({
	sysMenu: one(sysMenu, {
		fields: [sysRoleMenus.menuId],
		references: [sysMenu.id]
	}),
	sysRole: one(sysRole, {
		fields: [sysRoleMenus.roleId],
		references: [sysRole.id]
	}),
}));

export const sysMenuRelations = relations(sysMenu, ({ many }) => ({
	sysRoleMenus: many(sysRoleMenus),
}));