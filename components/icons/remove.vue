<template>
    <g>
        <rect class="cls-1" x="0.5" y="0.5" width="17" height="17" rx="1.5" ry="1.5"/>
        <path class="cls-2" d="M16,1a1,1,0,0,1,1,1V16a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H16m0-1H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2Z"/>
        <path class="cls-3" d="M12.75,10.91,10.84,9l1.91-1.91a.5.5,0,0,0,0-.71L11.62,5.25a.5.5,0,0,0-.71,0L9,7.16,7.09,5.25a.5.5,0,0,0-.71,0L5.25,6.38a.5.5,0,0,0,0,.71L7.16,9,5.25,10.91a.5.5,0,0,0,0,.71l1.13,1.13a.5.5,0,0,0,.71,0L9,10.84l1.91,1.91a.5.5,0,0,0,.71,0l1.13-1.13A.5.5,0,0,0,12.75,10.91Z"/>
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
    .cls-3{fill:#b21f1f;}
</style>