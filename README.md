# NEET 2026 Ultimate Tracker

## Tech
- React + Vite
- Context API
- LocalStorage (`neet-tracker-v1`)
- Tailwind CSS
- Fully client-side
- Vercel compatible

## Folder Structure

```txt
src/
  components/
  context/
  data/
  hooks/
  pages/
  utils/
```

## Features
- Portion tracker grouped by Subject → Chapter → Topic
- Difficulty tags, textbook/video/notes links, completion checkbox
- Chapter and subject progress bars + total dashboard progress
- Quiz system with filters: subject/chapter/topic/year/difficulty/question count (max 180)
- 1-question view, mark for review, timer, nav grid, saved answers
- Result view with score, correct/incorrect, weak topics, resource quick links
- PDF → Quiz generator (preview/edit/save/merge; capped to 180)
- Dashboard with totals, last score, quick start, resume quiz

## Run
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

## Deploy on Vercel
1. Push repo to GitHub
2. Import repo in Vercel
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

## Data schema
```json
{
  "id": "001",
  "subject": "Physics",
  "chapter": "Electrostatics",
  "topic": "Coulomb's Law",
  "difficulty": "Medium",
  "question": "...",
  "image": "...",
  "options": ["A", "B", "C", "D"],
  "answer": "B",
  "year": 2026,
  "notesLink": "",
  "videoLink": ""
}
```
