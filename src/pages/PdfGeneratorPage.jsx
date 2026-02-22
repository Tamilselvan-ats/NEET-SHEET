import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';

function parseQuestionsFromText(text) {
  const chunks = text.split(/\n\s*\d+[.)]\s+/).filter(Boolean);
  return chunks.slice(0, 180).map((chunk, i) => {
    const lines = chunk.split('\n').map((x) => x.trim()).filter(Boolean);
    const options = lines.filter((l) => /^[A-D][.)]/.test(l)).map((l) => l.replace(/^[A-D][.)]\s*/, ''));
    const question = lines.find((l) => !/^[A-D][.)]/.test(l) && !/^Answer[:\s]/i.test(l)) || `Question ${i + 1}`;
    const answerLine = lines.find((l) => /^Answer[:\s]/i.test(l));
    const answer = answerLine ? (answerLine.match(/[A-D]/i)?.[0] || 'A').toUpperCase() : 'A';
    return {
      id: `pdf-${Date.now()}-${i}`,
      subject: 'Physics',
      chapter: 'Imported',
      topic: 'Imported Topic',
      difficulty: 'Medium',
      question,
      image: '',
      options: options.length === 4 ? options : ['Option A', 'Option B', 'Option C', 'Option D'],
      answer,
      year: 2026,
      notesLink: '',
      videoLink: ''
    };
  });
}

export default function PdfGeneratorPage() {
  const { mergeQuestions } = useApp();
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState('');

  const canSave = useMemo(() => preview.length > 0 && preview.length <= 180, [preview]);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseQuestionsFromText(text);
      setPreview(parsed);
      setError('');
    } catch {
      setError('Could not parse PDF in-browser. For complex layouts use server-side OCR + parser pipeline.');
    }
  };

  const updateField = (idx, key, val) => setPreview((p) => p.map((q, i) => (i === idx ? { ...q, [key]: val } : q)));

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="card space-y-2">
        <h2 className="font-semibold">PDF → Quiz Generator</h2>
        <p className="text-sm text-slate-600">Upload PDF. For complex PDF/image scans, use OCR pipeline and then import JSON.</p>
        <input type="file" accept="application/pdf,.txt" onChange={onUpload} />
        {error && <p className="text-rose-600 text-sm">{error}</p>}
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Preview ({preview.length})</h3>
          <button className="btn-primary" disabled={!canSave} onClick={() => mergeQuestions(preview, 'pdf')}>Save & Merge</button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-auto">
          {preview.map((q, idx) => (
            <div key={q.id} className="border rounded p-3 bg-slate-50 space-y-2">
              <input value={q.question} onChange={(e) => updateField(idx, 'question', e.target.value)} />
              <div className="grid md:grid-cols-2 gap-2">
                {q.options.map((op, opIdx) => (
                  <input key={opIdx} value={op} onChange={(e) => setPreview((p) => p.map((x, i) => i === idx ? { ...x, options: x.options.map((ov, oi) => oi === opIdx ? e.target.value : ov) } : x))} />
                ))}
              </div>
              <input value={q.answer} onChange={(e) => updateField(idx, 'answer', e.target.value.toUpperCase())} maxLength={1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
