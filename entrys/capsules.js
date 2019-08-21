window.addEventListener('load', ()=> {
    const capsulesSellerPromise = import(/* webpackChunkName: "capsules-seller" */'./packages/capsulesSeller');
    capsulesSellerPromise.then(module => {
        const CapsulesSeller = module.CapsulesSeller;
        const capsulesSeller = new CapsulesSeller();
        capsulesSeller.init();
    })
});