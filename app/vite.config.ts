import { defineConfig } from 'vite';

import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';
// import devtools from 'solid-devtools/vite';

import { comlink } from 'vite-plugin-comlink';

import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'node:path'
import { resolve } from "node:path"


export default defineConfig({
    plugins: [
        comlink(),
        /*
        Uncomment the following line to enable solid-devtools.
        For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
        */
        // devtools(),
        solidPlugin(),
        solidSvg(),
        tsconfigPaths(),
    ],
    worker: {
        plugins: () => [comlink()],
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "#public": resolve(__dirname, "public"),
            "#root": resolve(__dirname)
        }
    },
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
    build: {
        target: 'esnext',
    },
});
