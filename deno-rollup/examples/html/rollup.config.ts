import { dirname } from "../../deps.ts";
import { html } from "../../plugins/html/mod.ts";

const __dirname = dirname(import.meta.url);
const format = "es" as const;

export default {
  input: new URL("./src/mod.ts", `${__dirname}/`).href,
  plugins: [
    html({
      template: ({}) => {
        return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />

            <title>Svelte app custom</title>

            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="stylesheet" href="/global.css" />
            <link rel="stylesheet" href="/build/bundle.css" />

            <script defer src="/build/bundle.js"></script>
          </head>

          <body></body>
        </html>`;
      },
    }),
  ],
  output: {
    dir: "./dist",
    format,
    sourcemap: true,
  },
  watch: {
    include: ["src/**"],
    clearScreen: true,
  },
  // Suppress circular dependency warnings about Deno's std library!
  onwarn: () => {},
};
