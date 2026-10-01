import { ArrowUpRight, MessageCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const feedbackPrompts = [
  { number: '01', tag: 'THE AHA MOMENT', question: 'What finally made an AI idea click for you?', tone: 'sage' },
  { number: '02', tag: 'THE HANDS-ON PART', question: 'Which experiment would you show a friend?', tone: 'clay' },
  { number: '03', tag: 'THE BIGGER QUESTION', question: 'What do you question differently now?', tone: 'gold' },
];
// These three slots stay empty until students actually send something back.

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="landing-width testimonials-inner">
        <Reveal>
          <div className="testimonials-heading">
            <div>
              <p className="studio-eyebrow"><MessageCircle size={14} /> STUDENT VOICES / NOT YET FILLED</p>
              <h2 id="testimonials-title">Three empty slots.<br /><em>Waiting on you.</em></h2>
            </div>
            <p>We could have written something glowing here. We’d rather leave the space open until a student who actually used the site tells us what worked — and then print it with their name on it, if they’re happy for us to.</p>
          </div>
        </Reveal>

        <div className="testimonials-collage">
          {feedbackPrompts.map(({ number, tag, question, tone }) => (
            <Reveal className={`testimonial-slot testimonial-slot--${tone}`} key={number}>
              <article>
                <div className="testimonial-slot-top"><span>QUOTE SLOT / {number}</span><Quote size={20} aria-hidden="true" /></div>
                <p className="testimonial-slot-tag">{tag}</p>
                <h3>{question}</h3>
                <div className="testimonial-slot-bottom"><span className="testimonial-avatar" aria-hidden="true">?</span><span>Nobody’s answered this one yet<small>Yours could go here</small></span></div>
              </article>
            </Reveal>
          ))}
          <span className="testimonial-sticker" aria-hidden="true">YOUR<br />WORDS ↗</span>
        </div>

        <div className="testimonials-footer"><span>Finished a chapter and have thoughts?</span><Link to="/contact">Tell us what landed <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>
  );
}
