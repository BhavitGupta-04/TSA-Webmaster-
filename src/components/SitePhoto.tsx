import { photoById } from '../data/photos';

interface SitePhotoProps {
  /** Key from src/data/photos.ts. */
  id: string;
  /** Short line printed over the photo. Describes the idea, not the people. */
  caption?: string;
  /** Taller crop for the two-up grid on About; wide crop for cards. */
  shape?: 'wide' | 'tall';
  /** First photo a visitor sees on a page should not be lazy-loaded. */
  priority?: boolean;
}

export default function SitePhoto({ id, caption, shape = 'wide', priority = false }: SitePhotoProps) {
  const photo = photoById[id];
  if (!photo) return null;

  return (
    <figure className={`site-photo site-photo--${shape}`}>
      <img
        src={photo.file}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={900}
        height={shape === 'tall' ? 1200 : 600}
      />
      {caption && <figcaption className="site-photo-caption">{caption}</figcaption>}
      <figcaption className="site-photo-credit">
        Photo:{' '}
        <a href={photo.url} target="_blank" rel="noopener noreferrer">
          {photo.photographer}
        </a>{' '}
        / Pexels
      </figcaption>
    </figure>
  );
}
