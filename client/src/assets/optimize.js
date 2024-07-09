// Throttle
const throttle = (handler, delay) => {
   let timer;
   return function (...args) {
      if (timer) return;
      timer = setTimeout(() => {
         handler(...args);
         timer = null;
      }, delay);
   };
}

const throttle2 = (handler, delay) => {
   let lastArgs = null;
   let shouldWait = false;
   return (...args) => {   
      if (shouldWait) {
         lastArgs = args;
         return;
      }
      handler(...args);
      shouldWait = true;
      setTimeout(() => {
         shouldWait = false;
         if (lastArgs) {
            handler(...lastArgs);
            lastArgs = null;
         }
      }, delay);
   };
};

