<template>
    <g>
        <path class="cls-1" d="M15.5,2.19H2.5A2.5,2.5,0,0,0,0,4.69v8.62a2.5,2.5,0,0,0,2.5,2.5h13a2.5,2.5,0,0,0,2.5-2.5V4.69A2.5,2.5,0,0,0,15.5,2.19Zm-13,1h13A1.5,1.5,0,0,1,17,4.69v.43l-7,5.31a1.77,1.77,0,0,1-2.11,0L1,5.17V4.69A1.5,1.5,0,0,1,2.5,3.19Zm13,11.62H2.5A1.5,1.5,0,0,1,1,13.31V6.42l6.33,4.81a2.77,2.77,0,0,0,3.32,0L17,6.38v6.93A1.5,1.5,0,0,1,15.5,14.81Z"/>
    </g>
</template>
<script>
    export default {
        props: {
            showBackground: {
                type: Boolean,
                default: false
            },
            backgroundColor: {
                type: String,
                default: '#fff'
            }
        }
    }
</script>
<style scoped>

</style>