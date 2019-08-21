<template>
    <section class="choose-movements-root">
        <header>Подборать часовые механиз&shy;мы</header>
        <transition name="fade" mode="out-in">
            <div
                    class="loading"
                    v-if="!movementsLoaded"
                    key="loading"
            >
                <font-awesome-icon icon="spinner" spin  size="lg"/>
            </div>
            <div v-else key="loaded">
                <div class="menu">
                    <menu-item
                            v-for="step, index in steps"
                            :step="step"
                            :index="index"
                            :activeStep="activeStep"
                            :key="step.name"
                            @menu-item-click="onMenuItemClick"
                    ></menu-item>
                </div>
                <transition name="slide" mode="out-in">
                    <div
                            v-if="compactStart"
                            class="compact-start-button"
                            @click="onCompactStartBtnClick"
                            key="compactStartButton"
                    >
                        Начать подбор механизмов
                    </div>
                    <div v-else key="content">
                        <transition name="fade" mode="out-in">
                            <type-step
                                    v-if="activeStep === 0"
                                    :movements="movements"
                                    :key="steps[activeStep].name"
                                    @type-chosen="onTypeChosen"
                            ></type-step>
                            <dial-width-step
                                    v-else-if="activeStep === 1"
                                    :movements="suitableMovements"
                                    :key="steps[activeStep].name"
                                    @dial-width-chosen="onDialWidthChosen"
                            ></dial-width-step>
                            <stroke-step
                                    v-else-if="activeStep === 2"
                                    :movements="suitableMovements"
                                    :key="steps[activeStep].name"
                                    @stroke-chosen="onStrokeChosen"
                            ></stroke-step>
                            <noisiness-step
                                    v-else-if="activeStep === 3"
                                    :movements="suitableMovements"
                                    :key="steps[activeStep].name"
                                    @noisiness-chosen="onNoisinessChosen"
                            ></noisiness-step>
                            <hanger-step
                                    v-else-if="activeStep === 4"
                                    :movements="suitableMovements"
                                    :key="steps[activeStep].name"
                                    @hanger-chosen="onHangerChosen"
                            ></hanger-step>
                            <nut-step
                                    v-else-if="activeStep === 5"
                                    :movements="suitableMovements"
                                    :key="steps[activeStep].name"
                                    @nut-chosen="onNutChosen"
                            ></nut-step>
                            <finish-step
                                    v-else-if="activeStep === 6"
                                    :movements="suitableMovements"
                                    :fasteners="fasteners"
                                    :restrictions="restrictions"
                                    entity="movement"
                                    :key="steps[activeStep].name"
                                    @again="onAgain"
                            ></finish-step>
                        </transition>
                    </div>
                </transition>
            </div>
        </transition>
    </section>
</template>
<script>
    import menuItem from './menu-item.vue'

    import typeStep from './steps/type.vue'
    import dialWidthStep from './steps/dialWidth.vue'
    import strokeStep from './steps/stroke.vue'
    import noisinessStep from './steps/noisiness.vue'
    import hangerStep from './steps/hanger.vue'
    import nutStep from './steps/nut.vue'
    import finishStep from './steps/finish.vue'

    export default {
        created() {
            this.compactStart = this.$root.compactStart;
            this.loadMovements();
            this.loadFasteners();
        },
        data(){
            return {
                compactStart: false,
                steps: [
                    {
                        name: 'type',
                        label: 'Шаг 1',
                        subLabel: 'Тип'
                    },
                    {
                        name: 'dialWidth',
                        label: 'Шаг 2',
                        subLabel: 'Толщина циферблата'
                    },
                    {
                        name: 'stroke',
                        label: 'Шаг 3',
                        subLabel: 'Ход секундной'
                    },
                    {
                        name: 'noisiness',
                        label: 'Шаг 4',
                        subLabel: 'Громкость'
                    },
                    {
                        name: 'hanger',
                        label: 'Шаг 5',
                        subLabel: 'Подвес'
                    },
                    {
                        name: 'nut',
                        label: 'Шаг 6',
                        subLabel: 'Фигурная гайка'
                    },
                    {
                        name: 'finish',
                        label: 'Финиш',
                        subLabel: 'Подходящие механизмы'
                    }

                ],
                restrictions: {
                    type: null,
                    dialWidth: null,
                    stroke: null,
                    noisiness: null,
                    hanger: null,
                    nut: null
                },
                movementsLoaded: false,
                activeStep: 0,
                suitableMovements: []
            }
        },
        computed: {
            movements() {
                return this.$store.getters.items('movementForSale')
            },
            fasteners() {
                return this.$store.getters.items('fastenerForSale')
            },
            stepComponentName() {
                return this.steps[this.activeStep].name + 'Step'
            }
        },
        watch: {
            movements(value, oldValue) {
                if (value!== null) {
                    this.movementsLoaded = true
                }
            }
        },
        methods: {
            loadMovements() {
                this.$store.dispatch('getItems', {entityName: 'movementForSale'});
            },
            loadFasteners() {
                this.$store.dispatch('getItems', {entityName: 'fastenerForSale'});
            },
            onTypeChosen(type) {
                this.nextStep();
                this.suitableMovements = this.getMovementsByType(type);
                this.restrictions.type = type;
            },
            onDialWidthChosen(width) {
                this.nextStep();
                this.suitableMovements = this.getMovementsByMaxDialWidth(width);
                this.restrictions.dialWidth = width;
            },
            onStrokeChosen(strokeType) {
                this.nextStep();
                this.suitableMovements = this.getMovementsByStroke(strokeType);
                this.restrictions.stroke = strokeType;
            },
            onNoisinessChosen(noisinessType) {
                this.nextStep();
                this.suitableMovements = this.getMovementsByNoisiness(noisinessType);
                this.restrictions.noisiness = noisinessType;
            },
            onHangerChosen(hanger) {
                this.nextStep();
                this.suitableMovements = this.getMovementsByHanger(hanger);
                this.restrictions.hanger = hanger;
            },
            onNutChosen(nut) {
                this.nextStep();
                this.restrictions.nut = nut;
            },
            onMenuItemClick(index) {
                this.goToStep(index);
            },
            goToStep(stepNumber) {
                if (stepNumber === 1) {
                    this.restrictions.dialWidth = null;
                    this.restrictions.stroke = null;
                    this.restrictions.noisiness = null;
                    this.restrictions.hanger = null;
                    this.restrictions.nut = null;

                    this.suitableMovements = this.getMovementsByType(this.restrictions.type)
                } else if (stepNumber === 2) {
                    this.restrictions.stroke = null;
                    this.restrictions.noisiness = null;
                    this.restrictions.hanger = null;
                    this.restrictions.nut = null;

                    this.suitableMovements = this.getMovementsByType(this.restrictions.type);
                    this.suitableMovements = this.getMovementsByMaxDialWidth(this.restrictions.dialWidth)
                } else if (stepNumber === 3) {
                    this.restrictions.noisiness = null;
                    this.restrictions.hanger = null;
                    this.restrictions.nut = null;

                    this.suitableMovements = this.getMovementsByType(this.restrictions.type);
                    this.suitableMovements = this.getMovementsByMaxDialWidth(this.restrictions.dialWidth);
                    this.suitableMovements = this.getMovementsByStroke(this.restrictions.stroke)
                } else if (stepNumber === 4) {
                    this.restrictions.hanger = null;
                    this.restrictions.nut = null;

                    this.suitableMovements = this.getMovementsByType(this.restrictions.type);
                    this.suitableMovements = this.getMovementsByMaxDialWidth(this.restrictions.dialWidth);
                    this.suitableMovements = this.getMovementsByStroke(this.restrictions.stroke);
                    this.suitableMovements = this.getMovementsByNoisiness(this.restrictions.noisiness)
                } else if (stepNumber === 5) {
                    this.restrictions.nut = null;

                    this.suitableMovements = this.getMovementsByType(this.restrictions.type);
                    this.suitableMovements = this.getMovementsByMaxDialWidth(this.restrictions.dialWidth);
                    this.suitableMovements = this.getMovementsByStroke(this.restrictions.stroke);
                    this.suitableMovements = this.getMovementsByNoisiness(this.restrictions.noisiness)
                }

                this.activeStep = stepNumber;
            },
            onCompactStartBtnClick() {
                this.compactStart = false;
            },
            onAgain() {
                this.goToStep(0);
            },

            nextStep() {
                this.activeStep += 1;
            },

            getMovementsByType(type) {
                let arr = [];
                for (let movement of this.movements) {
                    if (movement.type.name === type) {
                        arr.push(movement)
                    }
                }
                return arr;
            },
            getMovementsByMaxDialWidth(width) {
                if (width === 'all') {
                    return this.suitableMovements;
                }

                let arr = [];
                width = parseInt(width)
                for (let movement of this.suitableMovements) {
                    if (width === 4) {
                        if (movement.shaft.max_dial_width === 3 || movement.shaft.max_dial_width === 4) {
                            arr.push(movement)
                        }
                    } else {
                        if (movement.shaft.max_dial_width === width) {
                            arr.push(movement)
                        }
                    }
                }
                return arr;
            },
            getMovementsByStroke(stroke) {
                if (stroke === 'all') {
                    return this.suitableMovements;
                }

                let arr = [];
                for (let movement of this.suitableMovements) {
                    if (movement.strokeType.name === stroke) {
                        arr.push(movement);
                    }
                }
                return arr;
            },
            getMovementsByNoisiness(noisiness) {
                if (noisiness === 'all') {
                    return this.suitableMovements;
                }

                let arr = [];
                for (let movement of this.suitableMovements) {
                    if (movement.noisinesType.name === noisiness) {
                        arr.push(movement);
                    }
                }
                return arr;
            },
            getMovementsByHanger(hanger) {
                let needleValue;
                if (hanger === 'metal') {
                    this.restrictions.hanger = 'metal';
                    needleValue = 0;
                } else if (hanger === 'plastic') {
                    this.restrictions.hanger = 'plastic';
                    needleValue = 1;
                } else if (hanger === 'no') {
                    this.restrictions.hanger = 'no';
                    needleValue = 0;
                }

                let arr = [];
                for (let movement of this.suitableMovements) {
                    if (movement.plastic_hanger === needleValue) {
                        arr.push(movement);
                    }
                }
                return arr;
            }
        },
        components: {menuItem, typeStep, dialWidthStep,
            strokeStep, noisinessStep, hangerStep, nutStep, finishStep}
    }
</script>
<style scoped lang="stylus">
    * {
        font-family: "Alegreya Sans";
        color: #333;
    }
    .compact-start-button {
        background: #b970c4;
        color: #fff;
        padding: 25px;
        margin: 40px auto;
        font-size: 24px;
        text-transform: uppercase;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        width: 400px;
        line-height: 1.6;

        @media only screen and (max-width: 800px) {
            font-size: 20px;
            margin: 0 auto;
            padding: 10px;
        }
        @media only screen and (max-width: 640px) {
            font-size: 18px;
        }
        @media only screen and (max-width: 440px) {
            width: auto;
            margin: 0 20px;
        }
    }
    .choose-movements-root {
        margin: 20px 0;
    }
    header {
        font-family: "Alegreya Sans Light";
        font-size: 34px;
        margin-top: 40px;
    }
    .loading{
        text-align: center;
        padding: 20px;
        svg {
            color: #7F786E;
        }
    }
    .menu {
        display: flex;
        justify-content: center;
        margin: 30px 20px 0;

        @media only screen and (max-width: 840px) {
            flex-wrap: wrap;
            margin: 30px 10px 0;
        }
    }


    .fade-enter-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-leave-active {
        transition: all .3s ease;
        position: relative;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
        position: relative;
    }


    .slide-enter-active {
        transition: all .3s ease;
    }
    .slide-leave-active {
        transition: all .3s ease;
    }
    .slide-enter, .slide-leave-to{
        transform: translateY(-30px);
        opacity: 0;
    }
</style>