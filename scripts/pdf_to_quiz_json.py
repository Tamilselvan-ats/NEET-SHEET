#!/usr/bin/env python3
"""
Adapter script for converting NEET PDFs into quiz JSON.
Replace `extract_questions` with your existing extraction logic.
"""

import argparse
import json
from pathlib import Path


def extract_questions(pdf_path: Path):
    """Return list of quiz dictionaries parsed from PDF.

    This placeholder demonstrates the expected structure.
    """
    return [
        {
            "id": "001",
            "subject": "Physics",
            "chapter": "Electrostatics",
            "topic": "Coulomb's Law",
            "difficulty": "Medium",
            "question": f"Extracted from {pdf_path.name}: Sample question",
            "image": "assets/images/q1.svg",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "B",
            "year": 2026,
        }
    ]


def main():
    parser = argparse.ArgumentParser(description='Convert NEET PDF to quiz JSON')
    parser.add_argument('--input', required=True, help='Input PDF path')
    parser.add_argument('--output', required=True, help='Output JSON path')
    args = parser.parse_args()

    pdf_path = Path(args.input)
    output_path = Path(args.output)

    questions = extract_questions(pdf_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(questions, indent=2), encoding='utf-8')
    print(f'Wrote {len(questions)} questions to {output_path}')


if __name__ == '__main__':
    main()
