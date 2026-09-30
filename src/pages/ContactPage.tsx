import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, Bug, Lightbulb, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Reveal from '../components/Reveal';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';

const contactTopics = [
  { icon: MessageCircle, title: 'Share feedback', text: 'Tell us what felt clear, confusing, or surprisingly fun.' },
  { icon: Bug, title: 'Report a problem', text: 'Point out a broken link, quiz, or activity so we can investigate.' },
  { icon: Lightbulb, title: 'Suggest a lesson', text: 'Recommend an AI question, experiment, or classroom scenario.' },
];

export default function ContactPage() {
  const [topic, setTopic] = useState('Feedback about Signal Lab');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [issueUrl, setIssueUrl] = useState('');

  const prepareMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issue = new URL('https://github.com/BhavitGupta-04/TSA-Webmaster-/issues/new');
    issue.searchParams.set('title', `[${topic}] ${subject.trim()}`);
    issue.searchParams.set('body', `## ${topic}\n\n${message.trim()}\n\n---\nSent from the Signal Lab contact page.`);
    setIssueUrl(issue.toString());
  };

  return (
    <div className="signal-landing studio-interior contact-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="studio-page-hero contact-hero">
          <div className="landing-width contact-hero-layout">
            <div>
              <p className="studio-eyebrow">CONTACT / START A CONVERSATION</p>
              <h1>Good ideas start<br /><em>with a message.</em></h1>
              <p>Found a snag? Have a question or a lesson idea? Send the project team a note through the public repository.</p>
              <a className="landing-primary" href="https://github.com/BhavitGupta-04/TSA-Webmaster-/issues" target="_blank" rel="noreferrer">Visit the project page <ArrowUpRight size={17} /></a>
            </div>
            <ImagePlaceholder label="Signal Lab team working through student feedback" variant="project" />
          </div>
        </section>

        <section className="landing-width contact-options-section">
          <Reveal><div className="contact-options-heading"><div><p className="studio-eyebrow">WHAT WOULD YOU LIKE TO SHARE?</p><h2>Questions, glitches,<br /><em>bright ideas.</em></h2></div><p>Choose a topic and write a short note. We’ll prepare it as a GitHub issue so you can review it before posting.</p></div></Reveal>
          <div className="contact-topic-grid">{contactTopics.map(({ icon: Icon, title, text }, index) => <Reveal key={title}><article className={`contact-topic contact-topic--${index + 1}`}><span>0{index + 1}</span><Icon size={23} /><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
        </section>

        <section className="contact-form-band">
          <div className="landing-width contact-form-layout">
            <div className="contact-form-aside"><p className="studio-eyebrow">A NOTE TO THE TEAM</p><h2>Tell us what’s<br /><em>on your mind.</em></h2><p>Keep it about the site or learning experience. You don’t need to include your name, email, school, or any personal details.</p><div className="contact-privacy-note"><ShieldCheck size={19} /><span>Nothing is sent automatically. You’ll review the draft on GitHub before deciding whether to post it.</span></div></div>
            <form className="contact-message-form" onSubmit={prepareMessage}>
              <label htmlFor="contact-topic">What’s this about?</label>
              <select id="contact-topic" value={topic} onChange={(event) => { setTopic(event.target.value); setIssueUrl(''); }}><option>Feedback about Signal Lab</option><option>Something is not working</option><option>Idea for a lesson or activity</option><option>Question about the project</option></select>
              <label htmlFor="contact-subject">Short subject</label>
              <input id="contact-subject" value={subject} onChange={(event) => { setSubject(event.target.value); setIssueUrl(''); }} maxLength={90} placeholder="For example: Loved the pattern activity" required />
              <label htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" value={message} onChange={(event) => { setMessage(event.target.value); setIssueUrl(''); }} maxLength={2500} rows={6} placeholder="What should the team know?" required />
              <div className="contact-form-bottom"><span>{message.length}/2500 characters</span><button className="landing-primary" type="submit">Prepare message <ArrowUpRight size={17} /></button></div>
              {issueUrl && <div className="contact-ready" role="status"><BookOpen size={18} /><div><strong>Your draft is ready.</strong><p>GitHub issues are public and require a GitHub account to post. Review the draft and remove any details you don’t want public.</p><a href={issueUrl} target="_blank" rel="noreferrer">Review and post on GitHub <ArrowUpRight size={15} /></a></div></div>}
            </form>
          </div>
        </section>

        <section className="landing-width contact-backlink"><Link to="/about"><ArrowLeft size={16} /> Back to About Signal Lab</Link><span>We’re a student project. Thanks for helping us make it better.</span></section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
