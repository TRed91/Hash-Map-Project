class HashMap {

    buckets = new Array(16)

    #loadFactor = 0.8;
    #capacity = this.buckets.length;

    hash(key) {
        let hashCode = 0;
        let bucketNumber = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = hashCode * primeNumber + key.charCodeAt(i);
            bucketNumber = hashCode % this.buckets.length;
        }
        if (bucketNumber < 0 || bucketNumber >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        return bucketNumber;
    }

    set(key, value) {
        let bucketNumber = this.hash(key);

        let tmp = this.buckets[bucketNumber];
        if (this.length() > this.#capacity * this.#loadFactor) {
            this.#capacity *= 2
            this.buckets.length = this.#capacity;
        }

        if (tmp === undefined || tmp === null) {
            return this.buckets[bucketNumber] = {[key]: value, next: null};
        }
        while (tmp.next !== null) {
            if ([key] in tmp) {
                return tmp[key] = value;
            }
            tmp = tmp.next; 
        }
        if ([key] in tmp) {
            return tmp[key] = value;
        }
        return tmp.next = {[key]: value, next: null};
    }

    get(key) {
        let bucketNumber = this.hash(key);
        
        let tmp = this.buckets[bucketNumber];
        if (tmp === undefined || tmp === null) {return null}
        while (tmp.next !== null) {
            if ([key] in tmp) { return tmp[key]}
            tmp = tmp.next
        }
        if ([key] in tmp) { return tmp[key]}
        return null;
    }

    has(key) {
        let bucketNumber = this.hash(key);
        let tmp = this.buckets[bucketNumber];
        if (tmp === undefined || tmp === null) {return false}
        while (tmp.next !== null) {
            if ([key] in tmp) { return true}
            tmp = tmp.next
        }
        if ([key] in tmp) { return true}
        return false;
    }

    remove(key) {
        let bucketNumber = this.hash(key);
        let cur = this.buckets[bucketNumber];
        let prev = null;
        if (cur === undefined || cur === null) {return false}
        if ([key] in cur) {
            this.buckets[bucketNumber] = this.buckets[bucketNumber].next
            return true;
        }
        while (cur.next !== null) {
            if ([key] in cur) { 
                prev.next = cur.next;
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        if ([key] in cur) {
            prev.next = cur.next;
            return true;
        }
        return false;
    }

    length() {
        let count = 0;
        for (let e of this.buckets) {
            if (e) {
                while (e.next !== null) {
                    count++;
                    e = e.next
                }
                count++;
            }
        }
        return count;
    }

    clear () {
        this.buckets = new Array(16)
    }

    keys() {
        let arr = [];
        for (let e of this.buckets) {
            if (e) {
                while (e.next !== null) {
                    let key = Object.keys(e)[0]
                    arr.push(key);
                    e = e.next
                }
                let key = Object.keys(e)[0]
                arr.push(key);
            }
        }
        return arr;
    }

    values() {
        let arr = [];
        for (let e of this.buckets) {
            if (e) {
                while (e.next !== null) {
                    let value = Object.values(e)[0]
                    arr.push(value);
                    e = e.next
                }
                let value = Object.values(e)[0]
                arr.push(value);
            }
        }
        return arr;
    }

    entries() {
        let arr = [];
        for (let e of this.buckets) {
            if (e) {
                while (e.next !== null) {
                    let key = Object.keys(e)[0]
                    let value = Object.values(e)[0]
                    let subarr = [key, value]
                    arr.push(subarr);
                    e = e.next
                }
                let key = Object.keys(e)[0]
                let value = Object.values(e)[0]
                let subarr = [key, value]
                arr.push(subarr);
            }
        }
        return arr;
    }
}

let table = new HashMap;
