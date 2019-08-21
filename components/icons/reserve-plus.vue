<template>
    <g>
        <rect class="cls-1" x="0.5" y="1.88" width="17" height="15.38" rx="1.5" ry="1.5"/>
        <path class="cls-2" d="M16,2.38a1,1,0,0,1,1,1V15.75a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V3.38a1,1,0,0,1,1-1H16m0-1H2a2,2,0,0,0-2,2V15.75a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V3.38a2,2,0,0,0-2-2Z"/>
        <path class="cls-1" d="M2,4.88a1.5,1.5,0,1,1,0-3H16a1.5,1.5,0,0,1,0,3Z"/>
        <path class="cls-2" d="M16,2.38a1,1,0,0,1,0,2H2a1,1,0,0,1,0-2H16m0-1H2a2,2,0,1,0,0,4H16a2,2,0,0,0,0-4Z"/>
        <path class="cls-2" d="M3.75,3.25c-.28,0-.5-.16-.5-.36V.36c0-.2.22-.36.5-.36s.5.16.5.36V2.89C4.25,3.09,4,3.25,3.75,3.25Z"/>
        <path class="cls-2" d="M14.25,3.25c-.28,0-.5-.16-.5-.36V.36c0-.2.22-.36.5-.36s.5.16.5.36V2.89C14.75,3.09,14.53,3.25,14.25,3.25Z"/>
        <path class="cls-3" d="M13,9.7H10.3V7a.5.5,0,0,0-.5-.5H8.2a.5.5,0,0,0-.5.5V9.7H5a.5.5,0,0,0-.5.5v1.6a.5.5,0,0,0,.5.5H7.7V15a.5.5,0,0,0,.5.5H9.8a.5.5,0,0,0,.5-.5V12.3H13a.5.5,0,0,0,.5-.5V10.2A.5.5,0,0,0,13,9.7Z"/>

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