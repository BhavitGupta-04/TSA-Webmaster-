import { useState } from 'react';
import { Link } from 'react-router-dom';
import { referenceForLesson } from '../data/lessonReferences';

export default function LessonReferences({ lessonId }: { lessonId: string }) {
  const [loaded, setLoaded] = useState(false);
  const video = referenceForLesson(lessonId);
  if (!video) {
    return <details className="lesson-reference">
      <summary>Another perspective / optional YouTube reference</summary>
      <p role="status">No video reference has been added for this lesson yet.</p>
      <Link className="lesson-reference-library-link" to="/learn/references">Browse all video references</Link>
    </details>;
  }
  return <details className="lesson-reference">
    <summary>Another perspective / optional YouTube reference</summary>
    <h3>{video.title}</h3>
    <p>By {video.creator}. External reference; this creator is not affiliated with Signal Lab.</p>
    {loaded
      ? <iframe src={'https://www.youtube-nocookie.com/embed/' + video.id} title={video.title + ' by ' + video.creator} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      : <button type="button" className="academy-secondary" onClick={() => setLoaded(true)}>Load reference video</button>}
    <p className="academy-small">YouTube connects only when you load the player. If your school blocks it, the original lesson and transcript cover the core ideas.</p>
    <a href={'https://www.youtube.com/watch?v=' + video.id} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
    <p><strong>Watch with a question:</strong> {video.prompt}</p>
    <Link className="lesson-reference-library-link" to="/learn/references">Browse all video references</Link>
  </details>;
}
