<template>
    <label>
        {{ item.label }}
        <input
                disabled="disabled"
                :value="item.value"
        >
    </label>
</template>
<script>
    export default {
        props: {
            item: Object
        }
    }
</script>

<style scoped>
    * {
        outline: none;
        box-sizing: border-box;
    }

    label {
        display: block;
        margin-bottom: 21px;
        font-weight: bold;
        color: #635D56;
    }

    input {
        display: block;
        margin-top: 7px;
        padding: 7px 14px;
        border-radius: 4px;
        border: solid 1px #AFA598;
        font-size: 14px;
        width: 100%;
        min-width: 250px;
        transition: all 0.3s;
    }
</style>