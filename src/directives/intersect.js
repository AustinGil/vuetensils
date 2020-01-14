export default {
    inserted: (el, binding) => {
        const options = {
            ...binding.value
        };
	options.root = options.root && document.querySelector(options.root);
	var onLoadCall = true;
        const listeners = {
            onEnter: binding.value.onEnter,
            onLeave: binding.value.onLeave,
            onChange: binding.value.onChange
        }
        
        if(binding.value instanceof Function){
            const { enter, leave, change } = binding.modifiers
            listeners.onEnter = enter && binding.value;
            listeners.onChange = change && binding.value;
            listeners.onLeave = leave && binding.value;
        }

        const observer = new IntersectionObserver((entries) => {
	    if(!onLoadCall){
                const { isIntersecting } = entries[0];
                if(isIntersecting){
                    listeners.onEnter && listeners.onEnter(el);
                }else{
                    listeners.onLeave && listeners.onLeave(el);
                }
                listeners.onChange && listeners.onChange(el, isIntersecting);
	    }else{
	        onLoadCall = false;
	    }
        }, options);
        observer.observe(el);
    }
}
