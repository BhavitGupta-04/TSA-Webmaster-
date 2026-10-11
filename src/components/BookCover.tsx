import type { CSSProperties } from 'react';
import type { Book } from '../data/books';
import { photoById } from '../data/photos';

/**
 * A cover we make, not one we copy. Publishers' cover art is copyrighted, so
 * each book gets a Pexels photograph picked for its subject, tinted in the
 * book's two colours and overprinted with the title and author — which are
 * facts about the book. The photograph is credited on /sources through
 * src/data/photos.ts.
 */
export default function BookCover({ book, size = 'regular' }: { book: Book; size?: 'regular' | 'small' }) {
  const photo = photoById[book.photoId];
  const style = {
    '--cover-bg': book.cover.bg,
    '--cover-ink': book.cover.ink,
    '--cover-accent': book.cover.accent,
  } as CSSProperties;

  return (
    <div className={`book-cover book-cover--${size}`} style={style} aria-hidden="true">
      {photo && (
        <img
          className="book-cover-art"
          src={photo.file}
          alt=""
          loading="lazy"
          decoding="async"
          width={400}
          height={600}
        />
      )}
      <span className="book-cover-spine" />
      <span className="book-cover-rule" />
      <strong className="book-cover-title">{book.title}</strong>
      <span className="book-cover-author">{book.author}</span>
      <span className="book-cover-mark">{book.year}</span>
    </div>
  );
}
