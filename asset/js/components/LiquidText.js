class LiquidText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        // return ['image', 'text'];
        return ['text', 'fontSize'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        // const image = this.getAttribute('image') || '';
        const text = this.getAttribute('text') || '';
        const fontSize = this.getAttribute('fontSize') || '17';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                }

                // @import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400..700&family=Vazirmatn:wght@100..900&display=swap');
                *{font-family: 'Vazirmatn', sans-serif;}
                svg{font-weight:700;max-width:min(auto, 95%);height:auto;}
            </style>

            <svg viewbox="0 0 100 20">
            <defs>
                <linearGradient id="gradient">
                    <stop color="#000000"/>
                </linearGradient>
                <pattern id="wave" x="0" y="-0.5" width="100%" height="100%" patternUnits="userSpaceOnUse">
                <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)"> 
                    <animateTransform
                        attributeName="transform"
                        begin="0s"
                        dur="1.5s"
                        type="translate"
                        from="0,0"
                        to="40,0"
                        repeatCount="indefinite" />
                </path>
                </pattern>
            </defs>
            <text text-anchor="middle" x="50" y="15" font-size="`+fontSize+`" fill="#ffffff" fill-opacity="0.1">` + text + `</text>
            <text text-anchor="middle" x="50" y="15" font-size="`+fontSize+`" fill="url(#wave)"  fill-opacity="1">` + text + `</text>
            </svg>

        `;
    }
}

customElements.define('liquid-text', LiquidText); 