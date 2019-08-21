<template>
    <div class="make-order__need-login">
        Для оформления заказа нужно<br/>
        <a href="/login" class="login">Войти</a><span>или</span>
        <a href="/signup" class="signup">Зарегистрироваться</a>
    </div>
</template>
<style lang="stylus">
    .make-order__need-login {
        margin-top: 40px;
        text-align: center;
        font-size: 18px;
        span {
            margin 0 10px;
        }
        a {
            display: inline-block;
            font-size: 20px;
            padding: 10px 20px;
            margin: 15px 0;
            color: #fff;
            border-radius: 5px;
        }
        .login {
            background: #639355;
        }
        .signup {
            background: #567f96;
        }
    }
</style>