

//  ----------------- I DID NOT RUN BUILD -----------------  //
export default {
    inserted: (el, binding) => {
        let options;
        let handler;
        // user can pass a callback and it should work
        // setting all defaults to zero
        if(binding.value instanceof Function){
            options = {
                rootMargin: '0px',
                threshold: 0
            }
            handler = binding.value
        }else{
            // overwriting defaults by passing an object
            let { root, margin, threshold } = binding.value;
            options = {
                root: root ? document.querySelector(root) : null,
                rootMargin: margin ? margin : '0px',
                threshold: threshold ? threshold : 0
            }
            handler = binding.value.handler;
        }

        /**
         * This function decorates the callback function to
         * check for intersection and if found it would invoke the callback
         * and then unobserve.
         * I don't actually know if unobserving is a good thing but I would do it
         * @param {Function} cb the callback function recieved by user
         * @return decorated function
         */
        function dec(cb){
            function wrapper(entries, observer){
                for(let entry of entries){
                    if(entry.isIntersecting){
                        cb();
                        observer.unobserve(el);
                    }
                }
            }
            return wrapper;
        }

        let observer = new IntersectionObserver(dec(handler), options);
        observer.observe(el);
    }
}