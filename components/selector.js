/*const selects = custom.querySelectorAll('select');
for (const select of selects) {
    const div = document.createElement('div');
    const header = document.createElement('div');
    const datalist = document.createElement('datalist');
    const optgroups = select.querySelectorAll('optgroup');
    const span = document.createElement('span');
    const options = select.options;
    const parent = select.parentElement;
    const multiple = select.hasAttribute('multiple');
    /!*function onclick(e) {
        const disabled = this.hasAttribute('data-disabled');
        select.value = this.dataset.value;
        span.innerText = this.dataset.label;
        if (disabled) return;
        if (multiple) {
            if (e.shiftKey) {
                const checked = this.hasAttribute("data-checked");
                if (checked) {
                    this.removeAttribute("data-checked");
                } else {
                    this.setAttribute("data-checked", "");
                }
            } else {
                const options = div.querySelectorAll('.option');
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    option.removeAttribute("data-checked");
                }
                this.setAttribute("data-checked", "");
            }
        }
    }*!/

 /!*   function onkeyup(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.keyCode === 13) {
            this.click();
        }
    }*!/

    div.classList.add('select');
    header.classList.add('header');
    div.tabIndex = 1;
    select.tabIndex = -1;
    span.innerText = select.label;
    header.appendChild(span);

    for (const attribute of select.attributes) {
        div.dataset[attribute.name] = attribute.value;
    }
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('div');
        const label = document.createElement('div');
        const o = options[i];
        for (const attribute of o.attributes) {
            option.dataset[attribute.name] = attribute.value;
        }
        option.classList.add('option');
        label.classList.add('label');
        label.innerText = o.label;
        option.dataset.value = o.value;
        option.dataset.label = o.label;
        option.onclick = onclick;
        option.onkeyup = onkeyup;
        option.tabIndex = i + 1;
        option.appendChild(label);
        datalist.appendChild(option);
    }
    div.appendChild(header);
    for (const o of optgroups) {
        const optgroup = document.createElement('div');
        const label = document.createElement('div');
        const options = o.querySelectorAll('option');

        Object.assign(optgroup, o);
        optgroup.classList.add('optgroup');
        label.classList.add('label');
        label.innerText = o.label;
        optgroup.appendChild(label);
        div.appendChild(optgroup);
        for (const o of options) {
            const option = document.createElement('div');
            const label = document.createElement('div');

            for (const attribute of o.attributes) {
                option.dataset[attribute.name] = attribute.value;
            }
            option.classList.add('option');
            label.classList.add('label');
            label.innerText = o.label;
            option.tabIndex = i + 1;
            option.dataset.value = o.value;
            option.dataset.label = o.label;
            option.onclick = onclick;
            option.onkeyup = onkeyup;
            option.tabIndex = i + 1;
            option.appendChild(label);
            optgroup.appendChild(option);
        }
    }

    div.onclick = (e) => {
        e.preventDefault();
    };

    parent.insertBefore(div, select);
    header.appendChild(select);
    div.appendChild(datalist);
    datalist.style.top = `${header.offsetTop + header.offsetHeight}px`;

    div.onclick = (e) => {
        if (!multiple) {
            const open = this.hasAttribute("data-open");
            e.stopPropagation();
            if (open) {
                div.removeAttribute("data-open");
            } else {
                div.setAttribute("data-open", "");
            }
        }
    };

    div.onkeyup = (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            div.click();
        }
    };

    document.addEventListener('click', (e) => {
        if (div.hasAttribute("data-open")) {
            div.removeAttribute("data-open");
        }
    });

    const width = Math.max(...Array.from(options).map((e) => {
        span.innerText = e.label;
        return div.offsetWidth;
    }));

    console.log(width);
    div.style.width = `${width}px`;
}*/

class Selector {
    selector = null;
    selectorParent = null;
    container = null;
    header = null;
    datalist = null;
    optgroups = null;
    title = null;
    options = [];
    multiple = false;
    constructor(cssSelector) {
        this.initSelector(cssSelector);
    }

    initSelector(cssSelector) {
        this.selector = document.querySelector(cssSelector);
        this.container = document.createElement('div');
        this.header = document.createElement('div');
        this.datalist = document.createElement('datalist');
        this.optgroups = this.selector.querySelectorAll('optgroup');
        this.title = document.createElement('span');
        this.options = this.selector.options;
        this.selectorParent = this.selector.parentElement;
        this.multiple = this.selector.hasAttribute('multiple');

        this.container.classList.add('select');
        this.header.classList.add('header');
        this.container.tabIndex = 1;
        this.selector.tabIndex = -1;
        this.title.innerText = this.selector.label;
        this.header.appendChild(this.title);

        this.container.appendChild(this.header);

        for (const attribute of this.selector.attributes) {
            this.container.dataset[attribute.name] = attribute.value;
        }

        for (let i = 0; i < this.options.length; i++) {
            const option = document.createElement('div');
            const label = document.createElement('div');
            const originalOption = this.options[i];
            for (const attribute of originalOption.attributes) {
                option.dataset[attribute.name] = attribute.value;
            }
            option.classList.add('option');
            label.classList.add('label');
            label.innerText = originalOption.label;
            option.dataset.value = originalOption.value;
            option.dataset.label = originalOption.label;
            option.onclick = this.handleOptionClick.bind(this);
            option.onkeyup = this.handleKeyUp.bind(this);
            option.tabIndex = i + 1;
            option.appendChild(label);
            this.datalist.appendChild(option);
        }

        this.container.onclick = (e) => {
            e.preventDefault();
        };

        this.selectorParent.insertBefore(this.container, this.selector);
        this.header.appendChild(this.selector);
        this.container.appendChild(this.datalist);
        this.datalist.style.top = `${this.header.offsetTop + this.header.offsetHeight}px`;

        this.container.onclick = (e) => {
            if (!this.multiple) {
                const open = this.container.hasAttribute("data-open");
                e.stopPropagation();
                if (open) {
                    this.container.removeAttribute("data-open");
                } else {
                    this.container.setAttribute("data-open", "");
                }
            }
        };

        this.container.onkeyup = (event) => {
            event.preventDefault();
            if (event.keyCode === 13) {
                this.container.click();
            }
        };

        document.addEventListener('click', (e) => {
            if (this.container.hasAttribute("data-open")) {
                this.container.removeAttribute("data-open");
            }
        });

        const width = Math.max(...Array.from(this.options).map((e) => {
            this.title.innerText = e.label;
            return this.container.offsetWidth;
        }));

        console.log(width);

        this.container.style.width = `${width}px`;

    }



    handleOptionClick(event) {
        const elem = event.currentTarget;
        const disabled = elem.hasAttribute('data-disabled');
        this.selector.value = elem.dataset.value;
        this.title.innerText = elem.dataset.label;
        if (disabled) return;
        if (this.multiple) {
            if (event.shiftKey) {
                const checked = elem.hasAttribute("data-checked");
                if (checked) {
                    elem.removeAttribute("data-checked");
                } else {
                    elem.setAttribute("data-checked", "");
                }
            } else {
                const options = this.container.querySelectorAll('.option');
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    option.removeAttribute("data-checked");
                }
                elem.setAttribute("data-checked", "");
            }
        }
    }

    handleKeyUp(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.keyCode === 13) {
            event.currentTarget.click();
        }
    }
}
