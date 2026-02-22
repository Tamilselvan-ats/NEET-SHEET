import { useState } from 'react';

function PdfConverter() {
  const [message, setMessage] = useState('Use scripts/pdf_to_quiz_json.py for local conversion.');

  const onSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage(
      `Selected ${file.name}. Run: python3 scripts/pdf_to_quiz_json.py --input "${file.name}" --output public/generated-quiz.json`,
    );
  };

  return (
    <div className="uploader">
      <input type="file" accept="application/pdf" onChange={onSelect} />
      <small>{message}</small>
    </div>
  );
}

export default PdfConverter;
