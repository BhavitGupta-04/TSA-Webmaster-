import type { CSSProperties } from 'react';
import type { Book } from '../data/books';

/**
 * Covers are set in type rather than reproduced. Publishers' cover art is
 * copyrighted; a title and an author's name are facts about a book.
 */
export default function BookCover({ book, size = 'regular' }: { book: Book; size?: 'regular' | 'small' }) {
  const style = {
    '--cover-bg': book.cover.bg,
    '--cover-ink': book.cover.ink,
    '--cover-accent': book.cover.accent,
  } as CSSProperties;

  return (
    <div className={`book-cover book-cover--${size}`} style={style} aria-hidden="true">
      <span className="book-cover-spine" />
      <span className="book-cover-rule" />
      <strong className="book-cover-title">{book.title}</strong>
      <span className="book-cover-author">{book.author}</span>
      <span className="book-cover-mark">{book.year}</span>
    </div>
  );
}
