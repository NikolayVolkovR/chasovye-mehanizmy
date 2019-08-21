window.addEventListener('load', ()=> {
    const movementsSellerPromise = import(/* webpackChunkName: "movements-seller" */'./packages/movementsSeller');
    movementsSellerPromise.then(module => {
        const MovementsSeller = module.MovementsSeller;
        const movementsSeller = new MovementsSeller();
        movementsSeller.init();
    })
});