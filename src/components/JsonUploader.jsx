import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

function JsonUploader() {
  const [status, setStatus] = useState('');
  const { importQuestionBank } = useQuiz();

  const onUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('JSON must be an array of questions.');
      importQuestionBank(parsed);
      setStatus(`Loaded ${parsed.length} questions from ${file.name}`);
    } catch (error) {
      setStatus(`Failed to load JSON: ${error.message}`);
    }
  };

  return (
    <div className="uploader">
      <input type="file" accept="application/json" onChange={onUpload} />
      <small>{status}</small>
    </div>
  );
}

export default JsonUploader;
