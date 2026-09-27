import { ReactNode } from 'react';

export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderProps {
  size?: LoaderSize;
  tip?: ReactNode;
  fullscreen?: boolean;
  className?: string;
}

const Loader = ({
  size = 'md',
  tip,
  fullscreen = false,
  className,
}: LoaderProps) => (
  <div
    className={[
      'loader',
      `loader--${size}`,
      fullscreen ? 'loader--fullscreen' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
    role="status"
    aria-live="polite"
  >
    <div className="loader__content">
      <span className="loader__spinner" />
      {tip ? <span className="loader__tip">{tip}</span> : null}
    </div>
  </div>
);

export default Loader;
