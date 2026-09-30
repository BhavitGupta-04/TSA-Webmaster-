import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Headphones, MessageSquareText, Plus, ScanFace } from 'lucide-react';
import './everyday-ai.css';

const examples = [
  { id: 'music', label: 'YOUR NEXT FAVORITE SONG', title: 'That playlist gets you.', icon: Headphones, skill: 'Finding patterns', explanation: 'Music recommendations can use patterns in what you listen to, skip, and save to suggest songs you might enjoy.', takeaway: 'It predicts what you might like. It doesn’t know your taste perfectly.' },
  { id: 'face', label: 'A FAMILIAR FACE', title: 'Your face. Your phone.', icon: ScanFace, skill: 'Recognizing patterns', explanation: 'Some face-unlock systems use AI to compare features of your face with a saved representation and decide whether there’s a match.', takeaway: 'It compares patterns, rather than recognizing you the way a friend does.' },
  { id: 'chat', label: 'A LITTLE STUDY SUPPORT', title: 'A hint when you’re stuck.', icon: MessageSquareText, skill: 'Generating language', explanation: 'A study chatbot uses patterns learned from text to generate explanations, hints, or practice questions in response to your prompt.', takeaway: 'A helpful-sounding answer can still be wrong. Check it against your textbook.' },
];

export default function EverydayAI() {
  const [active, setActive] = useState<string | null>('music');
  return <section className="everyday-ai" aria-labelledby="everyday-title">
    <div className="studio-specimen-label"><span>ALREADY PART OF YOUR DAY</span><span>03 EVERYDAY CONNECTIONS ↘</span></div>
    <div className="everyday-heading"><h2 id="everyday-title">You’ve met AI.<br /><em>Maybe without noticing.</em></h2><p>Pick a card. Find the AI behind the familiar.</p></div>
    <div className="everyday-stack">{examples.map(({ id, label, title, icon: Icon, skill, explanation, takeaway }, index) => {
      const expanded = active === id;
      return <article key={id} className={`everyday-card everyday-${id} ${expanded ? 'is-open' : ''}`} style={{ '--example-index': index } as CSSProperties}>
        <h3><button type="button" aria-expanded={expanded} aria-controls={`everyday-${id}-detail`} onClick={() => setActive(expanded ? null : id)}><span className="everyday-icon"><Icon size={23} strokeWidth={1.6} /></span><span><small>{label}</small><strong>{title}</strong></span><Plus className="everyday-expand" size={19} /></button></h3>
        <div className="everyday-detail" id={`everyday-${id}-detail`} aria-hidden={!expanded}><div>
          <div className="everyday-scene" aria-hidden="true">{id === 'music' ? <><span className="everyday-record"><Headphones size={26} /></span><div className="everyday-wave">{[25,45,32,65,40,75,50,32,58,40,23,46].map((height, i) => <i key={i} style={{ height: `${height}%`, animationDelay: `${i * -.13}s` }} />)}</div><span className="everyday-scene-note">MADE FOR YOUR<br />WALK HOME.</span></> : id === 'face' ? <><div className="everyday-face-frame"><ScanFace size={49} strokeWidth={1.2} /></div><span className="everyday-scene-note">A PATTERN.<br />A POSSIBLE MATCH.</span></> : <><span className="everyday-chat-bubble">“Give me a hint,<br />not the answer.”</span><span className="everyday-chat-spark"><MessageSquareText size={27} /></span></>}</div>
          <span className="everyday-skill">{skill} <ArrowUpRight size={13} /></span><p>{explanation}</p><p className="everyday-takeaway">{takeaway}</p>
        </div></div>
      </article>;
    })}</div>
    <p className="everyday-footnote">Everyday tools. The same big ideas you’ll learn here.</p>
  </section>;
}
