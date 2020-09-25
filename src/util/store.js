const store = {
  local: {
    set(k, v) {
      let val = '';
      if (typeof v === 'object') {
        val = JSON.stringify(v);
      } else {
        val = v;
      }
      return localStorage.setItem(k, val);
    },
    get(k, tag) {
      if (tag) {
        return JSON.parse(localStorage.getItem(k));
      } else {
        return localStorage.getItem(k);
      }
    },
    remove(k) {
      return localStorage.removeItem(k);
    }
  },
  session: {
    set(k, v) {
      let val = '';
      if (typeof v === 'object') {
        val = JSON.stringify(v);
      } else {
        val = v;
      }
      return sessionStorage.setItem(k, val);
    },
    get(k, tag) {
      const value = sessionStorage.getItem(k);
      if (tag) {
        return JSON.parse(value);
      } else {
        return value;
      }
    },
    remove(k) {
      return sessionStorage.removeItem(k);
    }
  },
  cookie: {
    get(k) {
      const cookieInfo = document.cookie;
      const cookieArr = cookieInfo.split('; ');
      let cache = {}
      for (let i = 0; i < cookieArr.length; i++) {
        let splitCookiArr = cookieArr[i].split('=');
        let name = splitCookiArr[0];
        let val = splitCookiArr[1]
        cache[name] = val;
      }
      return cache[k] || undefined;
    }
  }
};

export {
  store
};
