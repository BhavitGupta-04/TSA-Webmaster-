import { Image, Plus } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  variant?: 'classroom' | 'project';
}

export default function ImagePlaceholder({ label, variant = 'classroom' }: ImagePlaceholderProps) {
  return (
    <figure className={`photo-placeholder photo-placeholder--${variant}`} role="img" aria-label={`Photo placeholder: ${label}`}>
      <div className="photo-placeholder-art" aria-hidden="true">
        <span className="placeholder-orbit placeholder-orbit--one" />
        <span className="placeholder-orbit placeholder-orbit--two" />
        <span className="placeholder-sun" />
        <span className="placeholder-hill placeholder-hill--back" />
        <span className="placeholder-hill placeholder-hill--front" />
        <span className="placeholder-frame"><Image size={25} strokeWidth={1.4} /><Plus size={15} /></span>
      </div>
      <figcaption><span>PHOTO SLOT</span><strong>{label}</strong><small>Replace this panel with an original team photo.</small></figcaption>
    </figure>
  );
}
