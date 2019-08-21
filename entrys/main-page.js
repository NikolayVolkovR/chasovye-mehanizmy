window.addEventListener('load', ()=> {
    const chooseMovementsPromise = import(/* webpackChunkName: "chooseMovements" */ './packages/chooseMovements');
    chooseMovementsPromise.then(module => {
        const ChooseMovements = module.chooseMovements;
        const chooseMovements = new ChooseMovements();
        chooseMovements.init();
    })

    const tryHandPromise = import(/* webpackChunkName: "tryHand" */ './packages/tryHand');
    tryHandPromise.then(module => {
        const TryHand = module.tryHand;
        const tryHand = new TryHand();
        tryHand.init();
    })
});

