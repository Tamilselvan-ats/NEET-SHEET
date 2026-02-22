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
# NEET Quiz Pro (React Web, Mobile Friendly)

This project is a mobile-friendly React Web application inspired by the Neet-sheet-pro experience and designed to integrate with your PDF-to-JSON pipeline.

## Features

- Home dashboard with progress summary
- Topic tracker with progress, notes/video links, and start quiz actions
- JSON uploader for quiz banks generated from your extraction script
- PDF conversion workflow helper + Python adapter script (`scripts/pdf_to_quiz_json.py`)
- Quiz player:
  - One-question-at-a-time interface
  - Question image support
  - Mark for review
  - Previous/Next controls
  - Question navigation grid
- Simulation mode with custom question count and timer
- Result screen with score + answer review
- Local progress persistence using `localStorage`
- Year filter in Topic Tracker

## Project Structure

- `src/components/` – screens and reusable UI modules
- `src/context/QuizContext.jsx` – state management with Context API
- `src/data/sampleQuiz.json` – sample NEET-style dataset
- `public/assets/images/` – image placeholders used by questions
- `scripts/pdf_to_quiz_json.py` – adapter script to map your PDF extraction to app JSON format

## Setup and Run

```bash
npm install
npm run dev
```

## Production Build
Then open `http://localhost:5173`.

## Build

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
## PDF-to-JSON Integration

Use your existing extraction logic inside `extract_questions` in `scripts/pdf_to_quiz_json.py`.

Example command:

```bash
python3 scripts/pdf_to_quiz_json.py --input ./your-neet.pdf --output ./public/generated-quiz.json
```

After generation, upload the JSON from Dashboard → **Import Quiz Data**.

## Expected JSON format

```json
[
  {
    "id":"001",
    "subject":"Physics",
    "chapter":"Electrostatics",
    "topic":"Coulomb's Law",
    "difficulty":"Medium",
    "question":"Question text",
    "image":"assets/images/q1.svg",
    "options":["A option","B option","C option","D option"],
    "answer":"B",
    "year":2026
  }
]
```
