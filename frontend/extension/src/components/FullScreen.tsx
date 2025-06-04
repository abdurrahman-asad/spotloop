import React, { useEffect } from 'react';

export const FullScreen = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden">
      {children}
    </div>
  );
};
