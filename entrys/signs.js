window.addEventListener('load', ()=> {
    const signsSellerPromise = import(/* webpackChunkName: "signs-seller" */'./packages/signsSeller');
    signsSellerPromise.then(module => {
        const SignsSeller = module.SignsSeller;
        const signsSeller = new SignsSeller();
        signsSeller.init();
    })
});