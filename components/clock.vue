<template>
    <transition name="fade" mode="out-in">
        <div class="clock-wrap" :style="wrapStyle">
            <transition name="fade" mode="out-in">
                <div class="dummy" v-if="!show" key="dummy"></div>
                <div class="clock" :class="modeClass" v-else key="clock">
                    <div class="clock-face" v-if="type === 'standard' || type === 'reverse' || type === '24' || type === 'pendulum'">
                        <div class="hand hour-hand" :style="transformHandStyle(hourDegrees)"></div>
                        <div class="hand min-hand" :style="transformHandStyle(minsDegrees)"></div>
                        <div class="hand second-hand" :style="transformHandStyle(secondsDegrees)"></div>
                    </div>
                    <div class="clock-face" v-if="type === 'power'">
                        <div class="hand hour-hand-power" :style="transformHandStyle(hourDegrees)"></div>
                        <div class="hand min-hand-power" :style="transformHandStyle(minsDegrees)"></div>
                        <div class="hand second-hand" :style="transformHandStyle(secondsDegrees)"></div>
                    </div>
                    <div class="index" v-if="type === 'standard' || type === 'pendulum' || type === 'power'">
                        <div class="dial i-12"></div>
                        <div class="dial i-1 small"></div>
                        <div class="dial i-2 small"></div>
                        <div class="dial i-3"></div>
                        <div class="dial i-4 small"></div>
                        <div class="dial i-5 small"></div>
                        <div class="dial i-6"></div>
                        <div class="dial i-7 small"></div>
                        <div class="dial i-8 small"></div>
                        <div class="dial i-9"></div>
                        <div class="dial i-10 small"></div>
                        <div class="dial i-11 small"></div>
                    </div>
                    <div class="hours24" v-if="type === '24'">
                        <div class="dial d-24">0</div>
                        <div class="dial small d-2">2</div>
                        <div class="dial small d-4">4</div>
                        <div class="dial d-6">6</div>
                        <div class="dial small d-8">8</div>
                        <div class="dial small d-10">10</div>
                        <div class="dial d-12">12</div>
                        <div class="dial small d-14">14</div>
                        <div class="dial small d-16">16</div>
                        <div class="dial d-18">18</div>
                        <div class="dial small d-20">20</div>
                        <div class="dial small d-22">22</div>
                    </div>
                    <div class="reverse" v-if="type === 'reverse'">
                        <div class="dial d-12">12</div>
                        <div class="dial small d-11">11</div>
                        <div class="dial small d-10">10</div>
                        <div class="dial d-9">9</div>
                        <div class="dial small d-8">8</div>
                        <div class="dial small d-7">7</div>
                        <div class="dial d-6">6</div>
                        <div class="dial small d-5">5</div>
                        <div class="dial small d-4">4</div>
                        <div class="dial d-3">3</div>
                        <div class="dial small d-2">2</div>
                        <div class="dial small d-1">1</div>
                    </div>
                    <div class="pendulum" v-if="type === 'pendulum'">
                        <div class="rect"></div>
                        <div class="circle"></div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default  {
        props: {
            stroke: {
                type: String,
                default: 'step'
            },
            type: {type: String, default: 'standard'},
            size: {
                type: Number,
                default: 100
            },
            mode: {
                type: String,
                default: 'regular'
            }
        },
        data() {
            return {
                secondsDegrees: 0,
                minsDegrees: 0,
                hourDegrees: 0,
                show: false
            }
        },
        created: function () {
            const timeout = this.stroke === 'step' ? 1000 : 100;
            setInterval(()=> {
                this.setDate();
                this.show = true
            }, timeout)
        },
        computed: {
            wrapStyle() {
                return [{width: this.size + 'px'}, {height: this.size + 'px'}]
            },
            modeClass() {
                return this.mode === 'compact' ? 'compact' : ''
            }
        },
        methods: {
            transformHandStyle (degrees) {
                return { transform: 'rotate(' + degrees + 'deg)' }
            },
            setDate () {
                const now = new Date();

                const seconds = now.getSeconds();
                const totalSeconds = this.getTotalSeconds(now);
                const degrees = this.getDegrees();

                this.secondsDegrees = ((totalSeconds / 60) * degrees) + 90;

                const mins = now.getMinutes();
                this.minsDegrees = ((mins / 60) * degrees) + ((seconds / 60) * 6) + 90;

                this.hourDegrees = this.getHourDegress(now)
            },
            getTotalSeconds (now) {
                const seconds = now.getSeconds();
                const mSeconds = now.getMilliseconds();
                return  this.stroke === 'step' ? seconds : (seconds + mSeconds / 1000)
            },
            getHoursCount() {
                if (this.type === '24') {
                    return 24
                } else {
                    return 12
                }
            },
            getDegrees() {
                return this.type === 'reverse' ? -360 : 360;
            },
            getHourDegress(now) {
                const mins = now.getMinutes();
                const hour = now.getHours();
                if (this.type === 'reverse') {
                    return ((hour / this.getHoursCount()) * this.getDegrees()) - ((mins / 60) * 30) + 90
                }
                return ((hour / this.getHoursCount()) * this.getDegrees()) + ((mins / 60) * 30) + 90
            }
        },
    }
</script>

<style scoped lang="stylus">
    * {
        box-sizing: border-box;
    }
    .clock-wrap {
        margin: 0 auto 25px;
        position: relative;
    }
    .dummy {
        width: 100%;
        height: 100%;
        border: 4px solid #ddd;
        background: #eee;
        border-radius: 50%;
    }
    .clock {
        background: #fff;
        width: 100%;
        height: 100%;
        border: 4px solid #b3b3b3;
        border-radius: 50%;
        margin: 0 auto 25%;
        position: relative;
        padding: 5%;

        &.compact {
            .dial {
                font-size: 12px!important;
            }
            .small {
                display: none!important;
            }

            .index {
                .dial {
                    background: #b3b3b3;
                }
            }

            .hours24 {
                .d-24 {
                    top: 2%;
                    left: 50%;
                    margin-left: -2px;
                }
                .d-6 {
                    top: 50%;
                    left: 84%;
                    margin-top: -8px;
                }
                .d-12 {
                    bottom: 2.5%;
                    left: 50%;
                    margin-left: -6px;
                }
            }
            .reverse {
                .d-6 {
                    bottom: 2.5%;
                    left: 53%;
                    margin-left: -6px;
                }
            }
        }
    }

    .clock-face {
        //background: pink;
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 5;

        .hand {
            background: #777;
            position: absolute;
            top:50%;
            transform-origin: 100%;
            transform: rotate(90deg);
        }
        .hour-hand {
            width:32%;
            height:7%;
            left: 18%;
            margin-top: -3.5%;
        }
        .hour-hand-power {
            width:32%;
            height: 12%;
            left: 18%;
            margin-top: -6%;
        }
        .min-hand {
            height: 5%;
            width:48%;
            margin-top: -2.5%;
            margin-left: 2.5%;
        }
        .min-hand-power {
            height: 10%;
            width:48%;
            margin-top: -5%;
        }
        .second-hand {
            height: 4%;
            transform-origin: 83%;
            background: red;
            width:58%;
            margin-top: -2%;
            margin-left: 2%;
        }
    }


    .dial {
        font-size: 14px;
        position: absolute;
        font-weight: bold;

        &.small {
            font-size: 12px;
        }
    }
    .hours24 .d-24 {
        top: 2%;
        left: 50%;
        margin-left: -4px;
    }
    .hours24 .d-2 {
        font-weight: normal;
        top: 15%;
        left: 68%;
        margin-top: -7px;
    }
    .hours24 .d-4 {
        font-weight: normal;
        top: 30%;
        left: 82%;
        margin-top: -7px;
    }
    .hours24 .d-6 {
        top: 50%;
        left: 87%;
        margin-top: -8px;
    }
    .hours24 .d-8 {
        font-weight: normal;
        top: 63%;
        left: 82%;
    }
    .hours24 .d-10 {
        font-weight: normal;
        top: 75%;
        left: 63%;
    }
    .hours24 .d-12 {
        bottom: 2.5%;
        left: 50%;
        margin-left: -8px;
    }
    .hours24 .d-14 {
        font-weight: normal;
        top: 75%;
        left: 22%;
    }
    .hours24 .d-16 {
        font-weight: normal;
        top: 63%;
        left: 8%;
    }
    .hours24 .d-18 {
        top: 50%;
        left: 3%;
        margin-top: -8px;
    }
    .hours24 .d-20 {
        font-weight: normal;
        top: 30%;
        left: 9%;
        margin-top: -7px;
    }
    .hours24 .d-22 {
        font-weight: normal;
        top: 15%;
        left: 24%;
        margin-top: -7px;
    }


    .reverse .d-12 {
        top: 2%;
        left: 50%;
        margin-left: -9px;
    }
    .reverse .d-11 {
        font-weight: normal;
        top: 15%;
        left: 62%;
        margin-top: -7px;
    }
    .reverse .d-10 {
        font-weight: normal;
        top: 30%;
        left: 76%;
        margin-top: -7px;
    }
    .reverse .d-9 {
        top: 50%;
        left: 87%;
        margin-top: -7px;
    }
    .reverse .d-8 {
        font-weight: normal;
        top: 64%;
        left: 81%;
    }
    .reverse .d-7 {
        font-weight: normal;
        top: 77%;
        left: 65%;
    }
    .reverse .d-6 {
        bottom: 2.5%;
        left: 53%;
        margin-left: -8px;
    }
    .reverse .d-5 {
        font-weight: normal;
        top: 77%;
        left: 26%;
    }
    .reverse .d-4 {
        font-weight: normal;
        top: 64%;
        left: 12%;
    }
    .reverse .d-3 {
        top: 50%;
        left: 3%;
        margin-top: -7px;
    }
    .reverse .d-2 {
        font-weight: normal;
        top: 30%;
        left: 9%;
        margin-top: -7px;
    }
    .reverse .d-1 {
        font-weight: normal;
        top: 15%;
        left: 24%;
        margin-top: -7px;
    }


    .index {
        .dial {
            width: 4%;
            height: 8%;
            background: #555;
            left:50%;
            margin-left: -2%;
            top: 1px;
            transform-origin: 50% 605%;

            &.small {
                width: 2%;
                height: 4%;
                margin-left: -1%;
                transform-origin: 50% 1210%;
            }
        }

        .i-1 {
            transform: rotate(30deg);
        }
        .i-2 {
            transform: rotate(60deg);
        }
        .i-3 {
            transform: rotate(90deg);
        }
        .i-4 {
            transform: rotate(120deg);
        }
        .i-5 {
            transform: rotate(150deg);
        }
        .i-6 {
            transform: rotate(180deg);
        }
        .i-7 {
            transform: rotate(210deg);
        }
        .i-8 {
            transform: rotate(240deg);
        }
        .i-9 {
            transform: rotate(270deg);
        }
        .i-10 {
            transform: rotate(300deg);
        }
        .i-11 {
            transform: rotate(330deg);
        }
    }


    .pendulum .rect {
        position: absolute;
        width: 8%;
        height: 20%;
        background: #b3b3b3;
        left: 50%;
        margin-left: -4%;
        animation: pendulum 1.2s linear alternate infinite;
        transform: rotate(-20deg);
        transform-origin: 50% -150%;
        top: 102%;
    }
    .pendulum .circle {
        position: absolute;
        width: 20%;
        height: 20%;
        background: #b3b3b3;
        border-radius: 50%;
        left: 50%;
        margin-left: -10%;
        bottom: -35%;
        transform-origin: 50% -210%;
        animation: pendulum 1.2s linear alternate infinite;
        transform: rotate(-20deg);
    }


    @keyframes pendulum {
        100% {
            transform: rotate(20deg);
        }
    }

    .fade-enter-active {
        transition: all .3s ease;
    }
    .fade-leave-active {
        transition: all .3s ease;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }


</style>