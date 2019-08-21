window.addEventListener('load', ()=> {
    const cartEditorPromise = import(/* webpackChunkName: "cart-editor" */'./packages/cartEditor');
    cartEditorPromise.then(module => {
        const CartEditor = module.CartEditor;
        const cartEditor = new CartEditor();
        cartEditor.init();
    })
});