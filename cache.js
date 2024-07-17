const Cache = function () {
    let c = {};

    c.set = function (key, value, duration) {
        const now = new Date().getTime();
        const item = {
            value: value,
            expiry: duration ? now + duration * 1000 : null // duration в секундах, преобразуем в миллисекунды
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    c.get = function (key) {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date().getTime();

        if (item.expiry && now > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    }

    c.exists = function (key) {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) {
            return false;
        }

        const item = JSON.parse(itemStr);
        const now = new Date().getTime();

        if (item.expiry && now > item.expiry) {
            localStorage.removeItem(key);
            return false;
        }

        return true;
    }
    return c;
}
let cache = new Cache();