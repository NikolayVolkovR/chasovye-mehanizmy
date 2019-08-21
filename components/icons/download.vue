<template>
    <g>
        <path class="cls-1" d="M15.5,1A1.5,1.5,0,0,1,17,2.5v13A1.5,1.5,0,0,1,15.5,17H2.5A1.5,1.5,0,0,1,1,15.5V2.5A1.5,1.5,0,0,1,2.5,1h13m0-1H2.5A2.5,2.5,0,0,0,0,2.5v13A2.5,2.5,0,0,0,2.5,18h13A2.5,2.5,0,0,0,18,15.5V2.5A2.5,2.5,0,0,0,15.5,0Z"/>
        <path class="cls-1" d="M14.5,3.25H3.5a1,1,0,0,0,0,2H8v5.39H5.15L8.6,15a.59.59,0,0,0,.8,0l3.44-4.4H10V5.25h4.5a1,1,0,0,0,0-2Z"/>
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