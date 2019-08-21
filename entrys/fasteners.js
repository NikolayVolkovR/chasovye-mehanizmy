
window.addEventListener('load', ()=> {
    const fastenersSellerPromise = import(/* webpackChunkName: "movements-seller" */'./packages/fastenersSeller');
    fastenersSellerPromise.then(module => {
        const FastenersSeller = module.FastenersSeller;
        const fastenersSeller = new FastenersSeller();
        fastenersSeller.init();
    })
});