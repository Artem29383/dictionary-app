import { useCallback, useState } from 'react';

function useTransition(initialState = false, timeout = 0, initialAnim = false) {
  const [state, setState] = useState(initialState);
  const [isAnim, setIsAnim] = useState(initialAnim);
  const toggle = useCallback(() => {
    if (!state) {
      setState(true);
      setTimeout(() => {
        setIsAnim(true);
      }, timeout);
    } else {
      setIsAnim(false);
      setTimeout(() => {
        setState(false);
      }, timeout);
    }
  }, [state]);

  return [state, toggle, isAnim];
}

export default useTransition;
