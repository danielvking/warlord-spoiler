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
    },
    debounce(func, time = 100) {
        let timestamp = 0;
        let isTimeout = false;

        return function () {
            if (!isTimeout) {
                let currTimestamp = new Date().getTime();
                let timeDiff = currTimestamp - timestamp;
                if (timeDiff >= time) {
                    timestamp = currTimestamp;
                    func.apply(this, arguments);
                } else {
                    isTimeout = true;
                    setTimeout(() => {
                        timestamp = new Date().getTime();
                        func.apply(this, arguments);
                        isTimeout = false;
                    }, time - timeDiff);
                }
            }
        }
    },
    readText() {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('style', 'display:none');
        document.body.append(input);
        return new Promise(resolve => {
            let fr = new FileReader();
            input.onchange = () => {
                fr.onload = x => resolve(x.target.result);
                fr.readAsText(input.files[0]);
            }
            input.click();
            input.remove();
        });
    },
    saveText(text, filename) {
        let a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click();
    }
}