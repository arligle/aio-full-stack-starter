/**
 * Drizzle 配置文件
 * 使用 drizzle-kit 定义配置
 * Drizzle 会自动检查驱动程序:

drizzle-kit先检查pg驱动是否安装并使用。
如果没有，将尝试找到 postgres 驱动程序并使用它。
如果仍然找不到，将尝试查找@vercel/postgres。
然后尝试@neondatabase/serverless。
如果没有找到任何内容，则会抛出错误。

 */
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

