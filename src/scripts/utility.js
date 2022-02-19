let tokenStrCache = []

export default {
  includesTokens(str, tokenStr) {
    str = str && str.toLowerCase();
    tokenStr = tokenStr && tokenStr.toLowerCase();

    let tokenStrRegex = tokenStrCache.filter(x => x.tokenStr === tokenStr)[0];
    if (!tokenStrRegex) {
      let quoteSplit = tokenStr.split('"');
      let regexParts = [];
      for (let i = 0; i < quoteSplit.length; i++) {
        let token = quoteSplit[i];
        if (token === "") continue;
        if (i % 2 === 1 && i !== quoteSplit.length - 1) {
          // Quoted token, match entire quoted text, and it cannot be bordered by a word character
          let prefix = /\w/.test(token[0]);
          let suffix = /\w/.test(token[token.length - 1]);
          token = this.escapeRegExp(token);
          if (prefix) token = "(^|(?<=\\W))" + token;
          if (suffix) token = token + "($|(?=\\W))";
          regexParts.push(token);
        } else {
          // Unquoted text, break up words, and it can be contained in another word
          let tokens = token.split(" ").filter(x => x !== "");
          tokens.forEach(tokenPart => regexParts.push(this.escapeRegExp(tokenPart)));
        }
      }
      tokenStrRegex = { tokenStr: tokenStr, regex: new RegExp(regexParts.join(".*"), "m") };
      tokenStrCache.push(tokenStrRegex);

      if (tokenStrCache.length > 20) tokenStrCache.shift();
    }

    return tokenStrRegex.regex.test(str);
  },
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },
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
    document.body.append(a);
    a.click();
    a.remove();
  },
  readImage() {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.png, .jpg, .jpeg');
    input.setAttribute('style', 'display:none');
    document.body.append(input);
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      input.onchange = () => {
        fr.onload = x => resolve(x.target.result);
        let filename = input.files[0].name.toLowerCase();
        if (!filename.endsWith(".png") && !filename.endsWith(".jpg") && !filename.endsWith(".jpeg")) {
          reject("Only PNG, and JPG files types are supported.");
        } else {
          fr.readAsDataURL(input.files[0]);
        }
      }
      input.click();
      input.remove();
    });
  },
  saveImage(dataUrl, filename) {
    let a = document.createElement('a');
    a.setAttribute('href', dataUrl);
    a.setAttribute('download', filename);
    document.body.append(a);
    a.click();
    a.remove();
  },
  stringCompare(a, b) {
    return (a || "").localeCompare(b || "");
  },
  insertKeyOrdered(obj, key, keyOrder, setFunc, deleteFunc) {
    // Having these functions allows optionally doing this with reactivity
    if (!setFunc) setFunc = (x, y, z) => x[y] = z;
    if (!deleteFunc) deleteFunc = (x, y) => delete x[y];

    // Map each defined key to an index
    let keySet = {};
    for (let i = 0; i < keyOrder.length; i++) {
      keySet[keyOrder[i]] = i + 1;
    }

    // Insert and/or quit early
    if (obj[key] != null) return;
    let keyIndex = keySet[key];
    deleteFunc(obj, key);
    let keys = Object.keys(obj);
    setFunc(obj, key, null);
    if (!keyIndex) return;

    // Look for the first key that doesn't match and shift everything
    for (let i = 0; i < keys.length; i++) {
      let oKey = keys[i];
      if (keySet[oKey] > keyIndex) {
        for (let j = i; j < keys.length; j++) {
          let temp = obj[keys[j]];
          deleteFunc(obj, keys[j]);
          setFunc(obj, keys[j], temp);
        }
        return;
      }
    }
  }
}