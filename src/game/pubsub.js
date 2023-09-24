export class PubSub {
    /**
     * @type {{[key: string]: Function[]}}
     */
    #events = {};

    constructor() {
        this.#events = {};
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    addEventListener(eventName, callback) {
        this.#events[eventName] = this.#events[eventName] || [];
        this.#events[eventName].push(callback);
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    removeEventListener(eventName, callback) {
        this.#events[eventName] = this.#events[eventName].filter(eventCallback => eventCallback !== callback);
    }

    /**
     * @param {string} eventName
     * @param {any} [data]
     */
    emit(eventName, data) {
        if (this.#events[eventName]) {
            this.#events[eventName].forEach(callback => callback(data));
        }
    }
}
