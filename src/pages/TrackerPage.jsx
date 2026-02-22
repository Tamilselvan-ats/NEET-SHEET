import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';

export default function TrackerPage() {
  const { trackerData, state, toggleTopic, setTopicNote } = useApp();
  const [subjectFilter, setSubjectFilter] = useState('All');

  const filtered = useMemo(() => trackerData.filter((s) => subjectFilter === 'All' || s.subject === subjectFilter), [trackerData, subjectFilter]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="card"><select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}><option>All</option>{trackerData.map((s) => <option key={s.subject}>{s.subject}</option>)}</select></div>
      {filtered.map((subject) => {
        const subjectTopics = subject.chapters.flatMap((c) => c.topics);
        const done = subjectTopics.filter((t) => state.trackerCompletion[t.id]).length;
        const subjectProgress = Math.round((done / subjectTopics.length) * 100);

        return (
          <section key={subject.subject} className="card space-y-3">
            <h2 className="text-xl font-semibold">{subject.subject} <span className="text-sm text-slate-500">{subjectProgress}%</span></h2>
            <ProgressBar value={subjectProgress} />
            {subject.chapters.map((chapter) => {
              const doneChapter = chapter.topics.filter((t) => state.trackerCompletion[t.id]).length;
              const chapterProgress = Math.round((doneChapter / chapter.topics.length) * 100);
              return (
                <div key={chapter.chapter} className="border border-slate-200 rounded-lg overflow-auto">
                  <div className="p-3 bg-slate-100 flex items-center justify-between">
                    <h3 className="font-medium">{chapter.chapter}</h3>
                    <span className="text-sm">{chapterProgress}%</span>
                  </div>
                  <ProgressBar value={chapterProgress} />
                  <table className="w-full text-sm">
                    <thead><tr className="text-left border-b"><th className="p-2">Done</th><th>Topic</th><th>Difficulty</th><th>Textbook</th><th>YouTube</th><th>Notes</th></tr></thead>
                    <tbody>
                      {chapter.topics.map((topic) => (
                        <tr key={topic.id} className="border-b align-top">
                          <td className="p-2"><input type="checkbox" checked={!!state.trackerCompletion[topic.id]} onChange={() => toggleTopic(topic.id)} /></td>
                          <td className="p-2">{topic.name}</td>
                          <td className="p-2">{topic.difficulty}</td>
                          <td className="p-2"><a className="text-brand-600" href={topic.textbookLink} target="_blank" rel="noreferrer">Book</a></td>
                          <td className="p-2"><a className="text-brand-600" href={topic.videoLink} target="_blank" rel="noreferrer">Video</a></td>
                          <td className="p-2 min-w-44"><input placeholder="Notes" value={state.trackerNotes[topic.id] || topic.notesLink || ''} onChange={(e) => setTopicNote(topic.id, e.target.value)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
