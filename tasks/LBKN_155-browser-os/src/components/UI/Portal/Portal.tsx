import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export const Portal = ({ children }: Props) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.append(container);
    
    return () => {
      container.remove();
    };
  }, []);

  return createPortal(children, container);
};
