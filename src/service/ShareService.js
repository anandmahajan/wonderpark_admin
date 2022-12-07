class ShareService {
    constructor() {
        this.map = new Map()
    }

    setMapValue(key, value) {
        this.map.set(key, value)
    }

    getMapValue(key) {
        if (this.map.has(key)) {
            return this.map.get(key)
        } else {
            return null
        }
    }

    leftPad(number) {
        var output = number + '';
        while (output.length < 6) {
            output = '0' + output;
        }
        return output;
    }

    clearMap() {
        this.map.clear()
    }

    deleteMapValue(key) {
        if (this.map.has(key)) {
            this.map.delete(key)
        }
    }
}

export default new ShareService({
    map: new Map()
})