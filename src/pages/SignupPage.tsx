import { ArrowLeft, ArrowRight, BrainCircuit, GraduationCap, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../state/useProgress';

export default function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('9');
  const { createFreshLearner } = useProgress();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = displayName.trim();
    if (!name) return;
    createFreshLearner(name, Number(gradeLevel));
    navigate('/portal');
  };

  return (
    <main className="signup-page">
      <div className="signup-layout">
        <section className="signup-story">
          <Link to="/" className="signup-back"><ArrowLeft size={16} /> Back to Signal Lab</Link>
          <div className="signup-story-content">
            <div className="signup-brand-mark"><BrainCircuit size={23} /></div>
            <p className="landing-kicker">YOUR OWN SIGNAL PATH</p>
            <h1>Make a space<br /><em>for your ideas.</em></h1>
            <p>Set up a learner profile, explore AI at your grade level, and watch your skills grow as you go.</p>
            <ul><li><GraduationCap size={18} /> Built for high school learners</li><li><ShieldCheck size={18} /> Your progress stays in this browser</li></ul>
          </div>
          <div className="signup-story-index">SIGNAL LAB <span> / </span> START HERE</div>
        </section>

        <section className="signup-form-wrap">
          <div className="signup-form-heading"><p className="landing-kicker landing-kicker--dark">CREATE YOUR PROFILE</p><h2>Welcome, future AI thinker.</h2><p>No password or email needed. Choose a name and grade to begin with a fresh profile.</p></div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="learner-name">What should we call you?</label>
            <input id="learner-name" name="displayName" autoComplete="given-name" maxLength={40} placeholder="Your first name or nickname" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
            <label htmlFor="grade-level">What grade are you in?</label>
            <select id="grade-level" name="gradeLevel" value={gradeLevel} onChange={(event) => setGradeLevel(event.target.value)}>
              <option value="9">Grade 9</option><option value="10">Grade 10</option><option value="11">Grade 11</option><option value="12">Grade 12</option>
            </select>
            <button className="landing-primary signup-submit" type="submit">Create profile & enter portal <ArrowRight size={18} /></button>
          </form>
          <p className="signup-privacy"><ShieldCheck size={16} /> This creates a local learner profile on this device. It is not an online account, and no email or password is collected.</p>
          <p className="signup-existing">Already started on this browser? <Link to="/portal">Open your learner portal</Link></p>
        </section>
      </div>
    </main>
  );
}
