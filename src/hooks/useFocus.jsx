import { useEffect, useState } from 'react';

export const useFocus = (ref, onFocusChanged = null, focusedByDefault = false) => {
  const [isFocused, setFocused] = useState(focusedByDefault);

  useEffect(
    () => {
      const component = ref.current;

      const onFocus = () => {
        setFocused(true);
        if(onFocusChanged !== null)
          onFocusChanged(true);
      }
      const onBlur = () =>  {
        setFocused(false);
        if(onFocusChanged !== null)
          onFocusChanged(false);
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
