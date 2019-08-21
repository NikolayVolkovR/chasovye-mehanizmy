window.addEventListener('load', ()=> {
    const handsSellerPromise = import(/* webpackChunkName: "hands-seller" */'./packages/handsSeller');
    handsSellerPromise.then(module => {
        const HandsSeller = module.HandsSeller;
        const handsSeller = new HandsSeller();
        handsSeller.init();
    })
});