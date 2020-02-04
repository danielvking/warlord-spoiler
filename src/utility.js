export default {
    forEachAsync(array, fn, maxTimePerChunk, context) {
        return new Promise(resolve => {
            context = context || window;
            maxTimePerChunk = maxTimePerChunk || 100;
            var index = 0;
        
            function now() {
                return new Date().getTime();
            }
        
            function doChunk() {
                var startTime = now();
                while (index < array.length && (now() - startTime) <= maxTimePerChunk) {
                    // callback called with args (value, index, array)
                    fn.call(context, array[index], index, array);
                    ++index;
                }
                if (index < array.length) {
                    // set Timeout for async iteration
                    setTimeout(doChunk, 1);
                } else {
                    resolve();
                }
            }    
            setTimeout(doChunk, 1);
        });
    },
    smoothScrollTo(element, to, duration) {
        let start = element.scrollTop;
        let difference = to - element.scrollTop;
    
        let soFar = 0;
        function scrollABit() {
            if (soFar >= duration) {
                element.scrollTop = to;
            } else {
                let percent = soFar / duration;
                let curve = (1 - Math.cos(Math.PI * percent)) / 2;
                element.scrollTop = difference * curve + start;
                soFar += 10;
                setTimeout(scrollABit, 10);
            }
        }
        scrollABit();
    }
}