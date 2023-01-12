import React, { useCallback, useState } from 'react';
import { Sick } from '../types/index';

const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
const ESCAPE = 'Escape';

const useKeyDown = (
  data: Sick[],
): [number, (e: React.KeyboardEvent<HTMLInputElement>) => void] => {
  const [activeIdx, setActiveIdx] = useState(-1);

  const handleKeyArrow = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case ARROW_DOWN:
          setActiveIdx(idx => idx + 1);
          if (activeIdx === data.length - 1) setActiveIdx(0);
          break;
        case ARROW_UP:
          setActiveIdx(idx => idx - 1);
          if (activeIdx <= 0) setActiveIdx(data.length - 1);
          break;
        case ESCAPE:
          setActiveIdx(-1);
          break;
        default:
          setActiveIdx(-1);
      }
    },
    [data, activeIdx],
  );

  return [activeIdx, handleKeyArrow];
};
export default useKeyDown;
