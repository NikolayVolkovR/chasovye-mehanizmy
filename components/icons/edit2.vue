<template>
    <g>
        <rect class="cls-1" x="0.5" y="0.5" width="17" height="17" rx="1.5" ry="1.5"/>
        <path class="cls-2" d="M16,1a1,1,0,0,1,1,1V16a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H16m0-1H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2Z"/>
        <path class="cls-3" d="M2.91,14.85a.23.23,0,0,0,.29.27L6,14.38,3.5,12Z"/>
        <polygon class="cls-4" points="4.2 11.28 6.7 13.76 13.03 7.42 10.55 4.94 4.2 11.28"/>
        <path class="cls-5" d="M14.79,4.2l-1.06-1a1,1,0,0,0-1.43,0L11.19,4.27,13.7,6.75l1.1-1.11A1,1,0,0,0,14.79,4.2Z"/>
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
    .cls-3{fill:#4d4d4d;}
    .cls-4{fill:#e2902d;}
    .cls-5{fill:#c63843;}
</style>