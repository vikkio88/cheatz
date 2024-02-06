const labelMap = {
    "ArrowUp": "⬆️",
    "ArrowDown": "⬇️",
    "ArrowLeft": "⬅️",
    "ArrowRight": "➡️",
    "Enter": "↩️",
    "Control": "Ctrl",
    "Shift": "🔼",
    " ": "Space",
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

export default class Keyecho {
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