export default {
    inserted: (el, binding) => {
        var options;
        var onEnter;
        var onChange;
        var onLeave;
        var threshold = 0;
        var rootMargin = '0px';
        var root = null;
        // user can pass a callback and it should work
        // setting all defaults to zero
        if(binding.value instanceof Function){
            options = {
                rootMargin,
                threshold
            }
            if(binding.modifiers.leave){
                onLeave = binding.value
            }
            else if(binding.modifiers.change)
                onChange = binding.value
            else{
                onEnter = binding.value
            }
        }else{
            // overwriting defaults by passing an object
            ({ root, rootMargin, threshold, onEnter, onChange, onLeave } = binding.value);
            options = {
                root: root ? document.querySelector(root) : null,
                rootMargin: rootMargin ? rootMargin : '0px',
                threshold: threshold ? threshold : 0
            }
        }

        /**
         * This function decorates the callback function to
         * check for intersection and if found it would invoke the callback
         * and then unobserve.
         * I don't actually know if unobserving is a good thing but I would do it
         * @param {Function} onEnter function to be invoked on enter
         * @param {Function} onLeave function to be invoked on exit
         * @param {Function} onChange function to be invoked on change ( both cases )
         * @return decorated function
         */
        function dec(onEnter, onLeave, onChange){
            function wrapper(entries, observer){
                for(let entry of entries){
                    if(onChange instanceof Function)
                        onChange();
                    if(entry.intersectionRatio > threshold){
                        if(onEnter instanceof Function)
                            onEnter();
                    }else{
                        if(onLeave instanceof Function)
                            onLeave();
                    }
                }
            }
            return wrapper;
        }

        let observer = new IntersectionObserver(dec(onEnter, onLeave, onChange), options);
        observer.observe(el);
    }
}