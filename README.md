
# Custom Configuration


### create `.env` file

```env
PORT=3000
```

### index.html
```html
-    <script type="module" src="/src/main.tsx"></script>
+    <script type="module" src="/src/client/main.tsx"></script>
```




### package.json
```
+  "main": "src/server/index.ts",
   "scripts": {
     "dev": "vite",
-    "build": "tsc && vite build",
+    "build:client": "vite build --outDir dist/client",
+    "build:server": "vite build --outDir dist/server --ssr src/server/index.ts",
+    "build": "npm run build:client && npm run build:server",
+    "start": "NODE_ENV=prod node dist/server/index.js",
     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
     "preview": "vite preview"
   },
```


### vite.config.ts
```typescript
+import express from "./express-plugin"; //Add this
 
 // https://vitejs.dev/config/
 export default defineConfig({
-  plugins: [react()],
+  plugins: [react(), express("src/server")],
})
```



### tsconfig.node.json
```
-  "include": ["vite.config.ts"]
+  "include": ["vite.config.ts", "express-plugin.ts"],
```


### express-plugin.ts
```typescript
export default function express(path: string) {
    return {
      name: "vite-plugin-express",
      configureServer: async (server: any) => {
        server.middlewares.use(async (req: any, res: any, next: any) => {
          process.env["NODE_ENV"] = "dev";
          try {
            const { app } = await server.ssrLoadModule(path);
            app(req, res, next);
          } catch (err) {
            console.error(err);
          }
        });
      },
    };
  }
  
```


```bash

npm i express dotenv
npm i -D @types/express @types/node



```


# Reference
https://vitejs.dev/guide/ssr

https://github.com/PaulieScanlon/simple-react-ssr-vite-express/blob/main/package.json

https://thenewstack.io/how-to-build-a-server-side-react-app-using-vite-and-express/

https://noam.hashnode.dev/using-vite-to-serve-and-hot-reload-react-app-express-api-together






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
