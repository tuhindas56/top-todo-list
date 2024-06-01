import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

export default defineConfig(({}) => {
  return {
    base: "/top-todo-list/",
    plugins: [
      createHtmlPlugin({
        minify: true,
      }),
    ],
  }
})
