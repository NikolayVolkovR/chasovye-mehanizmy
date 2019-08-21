<template>
    <select @change="onChange">
        <option v-for="option in options"
                :value="option.id"
                :selected="option.id == item.oldValue ? 'selected' : ''"
        >
            {{option.name}}
        </option>
    </select>
</template>

<script>
    export default {
        created() {
            if (this.action === 'create') {
                this.item.value = this.options[0].id
            } else {
                this.item.value = this.item.oldValue
            }
        },
        props: {
            item: Object,
            action: String
        },
        computed: {
            options() {
                let options = this.item.options,
                    optionsEntity = this.item.optionsEntity;

                if (options) {
                    return this.item.options
                } else if(optionsEntity){
                    return this.$store.getters.data(optionsEntity)
                } else {
                    console.log('Не указана сущность для загрузки опций.')
                }
            }
        },
        methods: {
            onChange($event) {
                this.item.value = $event.target.value
                this.$emit('valid-change')
            }
        }
    }
</script>

<style scoped>
    select {
        width: 100%;
        padding: 7px 14px;
        border-radius: 4px;
        border: solid 1px #AFA598;
        margin-top: 7px;
        font-size: 14px;
        transition: all 0.3s;
    }
    option {

    }
</style>