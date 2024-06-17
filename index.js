class HashMap {

    buckets = new Array(16)

    hash(key) {
        let hashCode = 0;
        let bucketNumber = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = hashCode * primeNumber + key.charCodeAt(i);
            bucketNumber = hashCode % 16;
        }
        return bucketNumber;
    }

    set(key, value) {
        let bucketNumber = this.hash(key);

        let tmp = this.buckets[bucketNumber];

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
        while (tmp.next !== null) {
            if ([key] in tmp) { return tmp[key]}
            tmp = tmp.next
        }
        if ([key] in tmp) { return tmp[key]}
        return null;
    }
}

let table = new HashMap;

table.set('Thomas', 33)
table.set('Christina', 31)
table.set('Karl', 63)
table.set('Andrea', 60)
table.set('Harry', 17)
table.set('Hermione', 16)
table.set('Ron', 17)
table.set('Albus', 88)
table.set('Severus', 53)
table.set('Sirius', 42)
table.set('Ginni', 14)
table.set('Fred', 18)
table.set('Hagrid', 62)
table.set('Draco', 16)
table.set('Tav', 31)
table.set('Sara', 24)
table.set('Mario', 42)
table.set('Luigi', 42)
table.set('Bowser', 97)
/* table.set('Peach', 21)
table.set('Luna', 15)
table.set('Claire', 28)
table.set('Sherry', 12)
table.set('Leon', 29)
table.set('Ada', 30)
table.set('Anette', 41) */

console.log(table)