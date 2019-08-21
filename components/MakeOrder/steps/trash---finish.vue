<template>
    <div class="make-order__finish-step">
        <p>Благодарим Вас за заказ!</p>
        <p>На Ваш e-mail будут приходить уведомления о ходе выполнения заказа.</p>
        <p>Вы так же можете отслеживать заказ в <a href="/cabinet">Личном кабенете</a></p>
    </div>
</template>
<style lang="stylus">
    .make-order__finish-step {
        p {
            font-size: 20px;
            font-family: "Alegreya Sans Light";
            color: #474645;
            margin: 12px 0;
        }
        a {
            font-size: 20px;
            font-family: "Alegreya Sans Light";
            color: #605f5d;
            text-decoration: underline;
            &:hover {
                color: #474645;
            }
        }
    }
</style>