import { useEffect, useState } from 'react';

export const useFocus = (ref, onFocusChanged, focusedByDefault = false) => {
  const [isFocused, setFocused] = useState(focusedByDefault);

  useEffect(
    () => {
      if(!ref) {
        return;
      }
      
      const component = ref.current;

      const onFocus = () => {
        setFocused(true);
        if(onFocusChanged) {
          onFocusChanged(true);
        }
      }
      const onBlur = () =>  {
        setFocused(false);
        if(onFocusChanged) {
          onFocusChanged(false);
        }
      }

      component.addEventListener('focus', onFocus);
      component.addEventListener('blur', onBlur);

      return () => {
        component.removeEventListener('focus', onFocus);
        component.removeEventListener('blur', onBlur);
      };
    }, [ref, onFocusChanged]
  );

  return isFocused;
};
