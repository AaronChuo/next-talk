import { memo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const LazyImage = memo(({ src, alt, width, height, className, ...otherProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="relative">
      {inView ? (
        <>
          {!isLoaded && (
            <div className={`${className} absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse`} />
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            {...otherProps}
          />
        </>
      ) : null}
    </div>
  );
});

export default LazyImage;
