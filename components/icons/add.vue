<template>
    <g>
        <rect class="cls-1" x="0.5" y="0.5" width="17" height="17" rx="1.5" ry="1.5"/>
        <path class="cls-2" d="M16,1a1,1,0,0,1,1,1V16a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H16m0-1H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2Z"/>
        <path class="cls-3" d="M13,7.7H10.3V5a.5.5,0,0,0-.5-.5H8.2a.5.5,0,0,0-.5.5V7.7H5a.5.5,0,0,0-.5.5V9.8a.5.5,0,0,0,.5.5H7.7V13a.5.5,0,0,0,.5.5H9.8a.5.5,0,0,0,.5-.5V10.3H13a.5.5,0,0,0,.5-.5V8.2A.5.5,0,0,0,13,7.7Z"/>
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
    .cls-1{fill:#f9f9f9;}
    .cls-2{fill:#494846;}
    .cls-3{fill:#19841f;}
</style>