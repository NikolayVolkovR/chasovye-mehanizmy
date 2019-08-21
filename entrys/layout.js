import '@babel/polyfill';
import css from '../layout.styl';

class Layout {
    constructor() {
        this.buttons = {
            header_whatsapp_btn: document.querySelector('.header-whatsapp-btn'),
            header_viber_btn: document.querySelector('.header-viber-btn'),
            header_mail_btn: document.querySelector('.header-mail-btn'),
            footer_whatsapp_btn: document.querySelector('.footer-whatsapp-btn'),
            footer_viber_btn: document.querySelector('.footer-viber-btn'),
            footer_mail_btn: document.querySelector('.footer-mail-btn'),
            menu_whatsapp_btn: document.querySelector('.menu-whatsapp-btn'),
            menu_viber_btn: document.querySelector('.menu-viber-btn'),
            menu_mail_btn: document.querySelector('.menu-mail-btn'),
            phone_btn: document.querySelector('.phone_btn')
        }
        this.elems = {
            menu_btn: document.querySelector('.menu_btn'),
            mobile_menu: document.querySelector('menu.layout >.mobile')
        }
        this.binds = {
            handleBodyClickToClosePopup: this.handleBodyClickToClosePopup.bind(this)
        }
    }
    init() {
        this.listen();
        this.handleFlashMessages();
    }

    listen() {
        this.elems.menu_btn.addEventListener('click', this.onMenuBtnClick.bind(this));
        this.listenHeaderButtons();
    }
    listenHeaderButtons() {
        for (let button in this.buttons) {
            const elem = this.buttons[button];

            if (elem) {
                elem.addEventListener('click', this.handleMessangerPopup.bind(this))
            }
        }
    }
    listenBodyClickToClosePopup() {
        document.body.addEventListener('click', this.binds.handleBodyClickToClosePopup)
    }

    onMenuBtnClick() {
        if (this.elems.menu_btn.classList.contains('opened')) {
            this.menuClose()
        } else {
            this.menuOpen()
        }
    }

    menuOpen() {
        this.elems.menu_btn.classList.add('opened');

        this.elems.mobile_menu.classList.add('open-enter');
        setTimeout(() => {
            this.elems.mobile_menu.classList.remove('open-enter');
            this.elems.mobile_menu.classList.add('open-to');
        }, 0)
    }
    menuClose() {
        this.elems.menu_btn.classList.remove('opened');

        this.elems.mobile_menu.classList.add('open-enter');
        setTimeout(() => {
            this.elems.mobile_menu.classList.remove('open-to');
            this.elems.mobile_menu.classList.remove('open-enter');
        }, 300)
    }
    isButton(elem) {
        for (let button in this.buttons) {

            if (elem.parentNode.parentNode === this.buttons[button]) {
                return true
            }
        }
        return false;
    }

    handleMessangerPopup(event) {
        const target = event.currentTarget;
        if (event.target.classList.contains('value')) {
            return false;
        }

        if (target.classList.contains('opened')) {
            this.pupupClose(target)
        } else {
            this.closeAllPopups();
            this.showShadow();
            this.popupOpen(target)
        }
    }
    handleBodyClickToClosePopup(event) {
        if (event.target.classList.contains('value') || this.isButton(event.target)) {
            return false;
        }
        this.closeAllPopups()
        document.body.removeEventListener('click', this.binds.handleBodyClickToClosePopup)
    }

    showShadow() {
        document.getElementById('layout-shadow').classList.add('layout-shadow-visible')
    }
    hideShadow() {
        document.getElementById('layout-shadow').classList.remove('layout-shadow-visible')
    }
    popupOpen(elem) {
        elem.classList.add('opened');
        const value = elem.querySelector('.value');

        value.classList.add('open-enter');
        setTimeout(() => {
            value.classList.remove('open-enter');
            value.classList.add('open-to');
            this.listenBodyClickToClosePopup ()
        }, 0)
    }
    pupupClose(elem) {
        elem.classList.remove('opened');
        const value = elem.querySelector('.value');

        value.classList.add('open-enter');
        setTimeout(() => {
            value.classList.remove('open-to');
            value.classList.remove('open-enter');
        }, 300)
    }
    closeAllPopups() {
        this.hideShadow()
        for (let button in this.buttons) {
            const elem = this.buttons[button]
            if (elem && elem.classList.contains('opened')) {
                this.pupupClose(elem)
            }
        }
    }

    handleFlashMessages() {
        let flashesElem = document.getElementById('flash-messages')
        if (flashesElem) {
            let elem = flashesElem.children[0];
            let key = elem.dataset.key;
            let value = elem.dataset.value;
            flashesElem.remove();

            let message = new Message({message: value})
            message.init();
        }

    }
}

class Message {
    constructor({message}) {
        this.message = message
        this.html = {};
    }

    init() {
        this.createElems()
        this.listen()
    }

    createElems() {
        let root = document.createElement('div');
        root.classList.add('message');
        this.html.root = root;

        let shadow = document.createElement('div');
        shadow.classList.add('message__shadow');
        this.html.shadow = shadow;

        let window = document.createElement('div');
        window.classList.add('message__window');
        this.html.window = window;

        let text = document.createElement('div');
        text.classList.add('message__text');
        this.html.text = text;
        text.innerText = this.message;
        window.append(text)

        let okButton = document.createElement('div');
        okButton.classList.add('message__ok-button');
        this.html.okButton = okButton;
        okButton.innerText = 'Хорошо!'
        window.append(okButton)


        root.append(shadow)
        root.append(window)
        document.body.append(root);

        setTimeout(()=>{
            root.classList.add('message_visible');
        },0);
    }
    listen() {
        this.html.root.addEventListener('click', this.handleEvent.bind(this));
    }
    handleEvent(event) {
        let target = event.target;
        event.stopPropagation();

        switch (target) {
            case this.html.okButton:
                this.handleOkButtonClick();
                break;
            case this.html.shadow:
                this.handleShadowClick();
                break;
        }
    }
    handleOkButtonClick() {
        this.close();
    }
    handleShadowClick() {
        this.close();
    }
    close() {
        this.html.root.classList.remove('message_visible');
        setTimeout(()=>{
            this.html.root.remove();
        }, 600);
    }
}

window.addEventListener('load', ()=> {
    const layout = new Layout()
    layout.init();
});

//export {Layout}


