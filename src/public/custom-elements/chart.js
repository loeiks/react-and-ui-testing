/// <reference lib="dom" />

import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { Charts } from "../react/components/Block";
import styles from "../css/files/tailwindcss";
import { setupForReact } from "@exweiv/wix-ce-helpers";

class ShadcnChartExample extends HTMLElement {
    rootDiv = document.createElement("div");
    customProps = { customElement: this };

    constructor() {
        super();
        setupForReact([], [styles], this);
    }

    // Attributes keys that's listened for changes
    static get observedAttributes() {
        return ["props"];
    }

    /**
     * @param {string} name Name of attribute (key)
     * @param {String} oldValue Old value of attribute
     * @param {String} newValue New value of attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "props") {
            this.render(newValue);
        }
    }

    render(props) {
        if (!props) { return null };

        const updatedProps = JSON.parse(props);
        for (const key of Object.keys(updatedProps)) {
            this.customProps[key] = updatedProps[key];
        }

        // Create another HTML element to mount into div element + pass props as JS object
        this.app = createElement(Charts, this.customProps);

        // Mount created app to div and render (after first mount it will only render changed elements)
        if (!this.root) {
            this.root = createRoot(this.rootDiv);
        }

        this.root.render(this.app);
    }
}

customElements.define("react-shadcn-chart", ShadcnChartExample);