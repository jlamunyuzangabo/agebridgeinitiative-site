# Age Bridge Initiative

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## GitHub Pages hosting

1. Create a new GitHub repository (any name) and upload/push ALL files from this folder to the `main` branch, including the hidden `.github` folder and the `patches` folder.
2. In GitHub, open **Settings -> Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and run **Deploy ABI website to GitHub Pages** (it also runs on every push to `main`).

The workflow sets the base path from the repository name automatically (`/<repo-name>/`, or `/` for a `username.github.io` repo). For a custom domain, set `BASE_PATH` to `/` in the workflow's build step.

The live ABI Stories page links to the story-submission form:
<https://docs.google.com/forms/d/e/1FAIpQLSfWGnV3nCpFVGK-WjY-o9rnzXrn8V_rVSDarZbAsr0hxS0c7g/viewform>

The form is ready for text, pillar, story type, date, review status, contact details, and a Google Drive image link. The Google Forms API cannot create native file-upload questions programmatically; the image-link field can be replaced with a native File upload question from the Form editor.
