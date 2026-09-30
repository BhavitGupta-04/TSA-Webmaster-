import { ArrowUpRight, MessageCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const feedbackPrompts = [
  { number: '01', tag: 'THE AHA MOMENT', question: 'What finally made an AI idea click for you?', tone: 'sage' },
  { number: '02', tag: 'THE HANDS-ON PART', question: 'Which experiment would you show a friend?', tone: 'clay' },
  { number: '03', tag: 'THE BIGGER QUESTION', question: 'What do you question differently now?', tone: 'gold' },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="landing-width testimonials-inner">
        <Reveal>
          <div className="testimonials-heading">
            <div>
              <p className="studio-eyebrow"><MessageCircle size={14} /> STUDENT VOICES / IN PROGRESS</p>
              <h2 id="testimonials-title">Testimonials.<br /><em>In their own words.</em></h2>
            </div>
            <p>Good learning is personal. We’re inviting students to share what clicked for them, and we’ll only publish real feedback with permission.</p>
          </div>
        </Reveal>

        <div className="testimonials-collage">
          {feedbackPrompts.map(({ number, tag, question, tone }) => (
            <Reveal className={`testimonial-slot testimonial-slot--${tone}`} key={number}>
              <article>
                <div className="testimonial-slot-top"><span>QUOTE SLOT / {number}</span><Quote size={20} aria-hidden="true" /></div>
                <p className="testimonial-slot-tag">{tag}</p>
                <h3>{question}</h3>
                <div className="testimonial-slot-bottom"><span className="testimonial-avatar" aria-hidden="true">?</span><span>Waiting for a learner’s words<small>Shared only with their permission</small></span></div>
              </article>
            </Reveal>
          ))}
          <span className="testimonial-sticker" aria-hidden="true">NO MADE-UP<br />REVIEWS ↗</span>
        </div>

        <div className="testimonials-footer"><span>Have a thought after a lesson?</span><Link to="/curriculum">Try a chapter, then come back to it <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>
  );
}
