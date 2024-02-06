const keyMaps = {
    "UP": "ArrowUp",
    "DOWN": "ArrowDown",
    "LEFT": "ArrowLeft",
    "RIGHT": "ArrowRight",
    "ENTER": "Enter",
    "TAB": "Tab",
    "CTRL": "Control",
    "ALT": "Alt",
    "SUPER": "Meta",
    "SPACE": " ",
};

export default class Cheatz {
    #sequence = '';
    #pointer = 0;
    constructor(mountPoint, sequence, callback, additionalMap = {}) {
        this.init(sequence, additionalMap);
        document.querySelector(mountPoint).addEventListener("keydown", event => {
            if (this.isNext(event.key)) {
                this.#pointer++;
                if (this.#pointer == this.#sequence.length) {
                    callback();
                    this.#pointer = 0;
                }
                return;
            }

            this.#pointer = 0;
        });
    }

    isNext(key) {
        return key == this.#sequence[this.#pointer];
    }

    init(sequence, additionalMap) {
        const map = { ...keyMaps, ...additionalMap };
        const split = sequence.split(' ');
        const parsedSequence = [];

        for (const key of split) {
            if (key.length < 2) {
                parsedSequence.push(key.toLowerCase());
                continue;
            }

            if (Boolean(map[key])) {
                parsedSequence.push(map[key]);
            }
        }
        this.#sequence = parsedSequence;
    }
}