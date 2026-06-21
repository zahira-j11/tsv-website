# TSV Casting Platform

The Social Vision's casting and outreach platform.

## Quickstart

```bash
cp .env.example .env
# fill in MONGODB_URI from your Atlas dashboard

npm install
npm run seed
npm run dev
```

Open http://localhost:3000 — you'll be redirected to the seeded Nike summer shoot campaign workspace.

## Architecture & next steps

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture, schema design rationale, and prioritised build list. That's also the file Claude Code reads first when you point it at this repo.

## Connecting your actor database Sheet

1. Open the actor database Sheet (`Talent Blackbook`) → Extensions → Apps Script.
2. Replace the contents with [`apps-script/sheet-sync.gs`](./apps-script/sheet-sync.gs).
3. `COLUMN_MAP` is already aligned to TSV's current actor database headers.
4. In Apps Script: File → Project properties → Script properties, set:
   - `WEBHOOK_URL` = `https://your-vercel-domain.vercel.app/api/sheet-sync`
   - `SHEET_SECRET` = same value as `SHEET_SYNC_SECRET` in your Vercel env
5. Triggers tab → add installable triggers for `onFormSubmit`, `onEdit`, and `onChange`.
6. Run `syncAllRows()` once to backfill existing rows.

After this, every form submission, edit, pasted row, and recently inserted
actor row syncs within seconds. The Sheet is treated as an append-only intake
feed for profile data: new rows create missing actors, while existing platform
profiles are matched by Sheet row ID or email and are not overwritten by later
Sheet reprocessing. Use `syncAllRows()` for safe backfills.

Most Google Form upload headshots are private Drive files. The Apps Script
reads those private files from the Sheet owner's Drive access and posts the
image bytes to the app, which saves them under `/public/headshots`. If you only
import from a CSV export, private headshots cannot be downloaded by the app.

## Connecting your project tracker Sheet

The project management Sheet stays as the working tracker, and the app mirrors
each row into a client campaign video concept.

1. Open the project tracker Sheet -> Extensions -> Apps Script.
2. Add [`apps-script/project-tracker-sync.gs`](./apps-script/project-tracker-sync.gs).
3. In Apps Script: File -> Project properties -> Script properties, set:
   - `WEBHOOK_URL` = `https://your-vercel-domain.vercel.app/api/project-tracker-sync`
   - `TRACKER_SECRET` = same value as `PROJECT_TRACKER_SYNC_SECRET` in your app env
4. Triggers tab -> add an installable `onEdit` trigger.
5. Run `syncAllRows()` once to backfill the existing tracker tabs.

Rows are grouped as campaigns by client and tracker tab, so the `April-May`
tab for one client becomes that client's `April-May` campaign in the app.
hig

## Deploying

```bash
vercel
```

Set env vars in the Vercel dashboard. The daily sequence cron is configured in `vercel.json`.
