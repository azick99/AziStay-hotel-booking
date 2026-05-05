import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc,
  ...props
}: LazyImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleLoad = () => setLoaded(true);
  const handleError = () => {
    setHasError(true);
    setLoaded(true);
  };

  const visibleSrc = isVisible ? src : undefined;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden bg-neutral-100 dark:bg-neutral-900",
        wrapperClassName,
      )}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800" />
      )}

      {hasError ? (
        <div className="flex h-full min-h-30 w-full flex-col items-center justify-center gap-2 p-4 text-neutral-500 dark:text-neutral-400 text-sm">
          <ImageOff className="w-6 h-6" />
          <span>Image unavailable</span>
        </div>
      ) : visibleSrc || fallbackSrc ? (
        <img
          src={visibleSrc ?? fallbackSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : null}
    </div>
  );
}
