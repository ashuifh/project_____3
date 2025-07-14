import { useEffect, useRef } from 'react';

export const useBackgroundTasks = (callback: () => void) => {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timeoutId: number;
    
    const scheduleTask = () => {
      if ('requestIdleCallback' in window) {
       
        window.requestIdleCallback(() => {
          callbackRef.current();
          timeoutId = window.setTimeout(scheduleTask, 60000); 
        });
      } else {
       
        timeoutId = window.setTimeout(() => {
          callbackRef.current();
          scheduleTask();
        }, 60000);
      }
    };

    scheduleTask();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
};