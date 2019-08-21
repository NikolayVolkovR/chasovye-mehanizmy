<template>
    <g>
        <path class="cls-1" d="M15.5,4.44H2.5A2.5,2.5,0,0,0,0,6.94v8.62a2.5,2.5,0,0,0,2.5,2.5h13a2.5,2.5,0,0,0,2.5-2.5V6.94A2.5,2.5,0,0,0,15.5,4.44Zm-13,1h13A1.5,1.5,0,0,1,17,6.94v.43l-7,5.31a1.77,1.77,0,0,1-2.11,0L1,7.42V6.94A1.5,1.5,0,0,1,2.5,5.44Zm13,11.62H2.5A1.5,1.5,0,0,1,1,15.56V8.67l6.33,4.81a2.77,2.77,0,0,0,3.32,0L17,8.63v6.93A1.5,1.5,0,0,1,15.5,17.06Z"/>
        <polygon class="cls-2" points="10.64 11.5 4.49 4.81 7 2.38 10.51 6.02 15 0 18 2 10.64 11.5"/>
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
    .cls-1{fill:#999;}
    .cls-2{fill:#8ec63f;}
</style>