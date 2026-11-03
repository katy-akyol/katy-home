# Kate's Garden

A quiet home base for everyday life: Scripture, the Kitchen and our school days.

## Rooms

- **Today** (`/`): greeting, verse of the day, three intentions, today's reading, school rhythm, tonight's dinner
- **Scripture** (`/bible`): reading plan "vine", SOAP study journal, prayer list with answered archive, memory verse
- **Kitchen** (`/kitchen`): weekly meal plan, auto-built grocery list by aisle, recipe box, Cook Mode
- **School** (`/school`): daily rhythm per child, lesson log, curriculum progress, attendance, nature journal
- **Sunday Reset** (`/reset`): a guided ten-minute weekly plan

The palette follows the time of day: dawn, day, dusk and night.

## Status: Phase 1 preview

All content is sample data in [`lib/data.js`](lib/data.js). Check-offs and notes are saved in the
browser on this device only. Phase 3 adds a database and private login so everything syncs.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js on Vercel. Every push to `main` deploys to production automatically.
