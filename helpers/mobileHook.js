import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

function useIsMobile(){
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', debounce(updateSize, 250));
    return window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
