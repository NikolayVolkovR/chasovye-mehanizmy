<template>
    <div id="admin">
        <div class="content">
            <header class="app__header">
                <div class="app__name"><router-link to="/">Часовые Механизмы</router-link></div>
            </header>

            <main>
                <div class="app__left-menu">
                    <vue-menu :items="menuItems"></vue-menu>
                </div>
                <div class="app__content">
                    <div class="app__content-wrap">
                        <router-view></router-view>
                    </div>
                </div>
            </main>
        </div>
        <footer>

        </footer>
    </div>
</template>

<script>
    import VueMenu from './common/Menu/Menu.vue';
    import {mapGetters} from 'vuex'

    export default {
        name: 'AdminApp',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'menuItems'
            ])
        },
        components: {
            VueMenu
        }
    }
</script>
<style>
    * {
        outline: none;
    }
    html, body {
        height: 100%;
        width : 100%;
        margin: 0;
        padding: 0;
    }
    h1 {
        color: #4D4D4D;
        text-transform: uppercase;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

    #admin {
        display: flex;
        flex-direction: column;
        height: 100%;
        font-family: "Century Gothic";
    }

    .app__header {
        background: #AFA598;
        display: flex;
    }
    .app__name {
        background: #7F786E;
        color: #fff;
        flex-basis: 200px;
        padding: 20px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
    }

    main {
        /*flex-basis: 100%;
        height: 100%;*/
        display: flex;
        flex: 1 0 auto;
    }
    .app__left-menu {
        min-width: 240px;
        flex-basis: 240px;
        background: #494846;
        padding-top: 30px;
    }
    .app__content {
        flex-basis: calc(100% - 240px);
        background: #F9F9F9;
    }
    .app__content-wrap {
        margin: 20px;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
    }
    footer {
        background: #494846;
        flex: 0 0 auto;
    }
</style>