const keyMaps = {
    "UP": "ArrowUp",
    "DOWN": "ArrowDown",
    "LEFT": "ArrowLeft",
    "RIGHT": "ArrowRight",
    "ENTER": "Enter",
    "TAB": "Tab",
    "CTRL": "Control",
    "ALT": "Alt",
    "SUPER": "Meta"
};

class Cheatz {
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

const labelMap = {
    "ArrowUp": "⬆️",
    "ArrowDown": "⬇️",
    "ArrowLeft": "⬅️",
    "ArrowRight": "➡️",
    "Enter": "↩️",
    "Control": "Ctrl",
    "Shift": "🔼"
};

let KeyechoCss = `
.keyecho {
    border: solid 1px #2C302E;
    background-color: #2C302E;
    color: white;
    font-size: 3rem;
    padding: 1rem 2rem;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 3rem;
    animation: fadeup 1.5s;
}

@keyframes fadeup {
    from {
        bottom: 0;
        opacity: 1;
    }

    to {
        bottom: 10%;
        opacity: .1;
    }
}
`;

class Keyecho {
    #isOn = true;
    #labels = {};
    constructor(mountPoint, additionalLabels = {}, style = null) {
        this.#labels = { ...labelMap, ...additionalLabels };
        const styleElem = document.createElement("style");
        styleElem.textContent = style ?? KeyechoCss;
        document.head.appendChild(styleElem);
        document.querySelector(mountPoint).addEventListener("keydown", event => {
            if (!this.#isOn) {
                return;
            }

            const echoTT = document.createElement("div");
            echoTT.classList.add("keyecho");
            echoTT.innerText = this.getKeyLabel(event.key);
            document.querySelector("body").appendChild(echoTT);

            setTimeout(function () {
                echoTT.parentNode.removeChild(echoTT);
            }, 1200);
        });
    }

    getKeyLabel(key) {
        return this.#labels[key] ?? key;
    }

    toggle() {
        this.#isOn = !this.#isOn;
    }
}


// export { Cheatz, Keyecho };