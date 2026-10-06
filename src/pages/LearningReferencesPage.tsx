import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessonReferences } from '../data/lessonReferences';
import { lessons } from '../data/portalCurriculum';
import '../styles/lesson-focus.css';

export default function LearningReferencesPage() {
  return <div className="academy-page lesson-references-page">
    <Link className="lesson-references-back" to="/learn?lesson=patterns"><ArrowLeft size={15} />Back to lessons</Link>
    <header className="lesson-references-header">
      <p className="academy-kicker">MY LEARNING / EXTRA PERSPECTIVES</p>
      <h1>Video references</h1>
      <p>Explore these optional videos from other educators and organizations. They offer another perspective; the Signal Lab lessons and transcripts are enough to complete your learning.</p>
    </header>
    <div className="lesson-reference-library">
      {lessonReferences.map(reference => <article className="lesson-reference-card" key={reference.id}>
        <p className="academy-kicker"><Play size={14} />OPTIONAL YOUTUBE VIDEO</p>
        <h2>{reference.title}</h2>
        <p className="lesson-reference-creator">By {reference.creator}</p>
        <p>{reference.focus}</p>
        <p className="academy-small">{reference.note}</p>
        <p><strong>Watch with a question:</strong> {reference.prompt}</p>
        <div className="lesson-reference-related">
          <span>Related lessons</span>
          {reference.lessonIds.map(id => {
            const lesson = lessons.find(item => item.id === id);
            return lesson
              ? <Link key={id} to={'/learn?lesson=' + id}>{lesson.title}</Link>
              : null;
          })}
        </div>
        <a className="academy-button lesson-reference-watch" href={'https://www.youtube.com/watch?v=' + reference.id} target="_blank" rel="noopener noreferrer">
          Watch on YouTube <ExternalLink size={15} />
        </a>
      </article>)}
    </div>
    <p className="lesson-reference-disclaimer">These external videos are optional and are not produced or endorsed by Signal Lab. Opening one takes you to YouTube.</p>
  </div>;
}
