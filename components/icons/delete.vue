<template>
    <g>
        <rect v-if="showBackground" :fill="backgroundColor" width="18" height="18" rx="2.5" ry="2.5"/>
        <polygon points="14.54 3.97 14.03 3.46 9 8.49 3.97 3.46 3.46 3.97 8.49 9 3.46 14.03 3.97 14.54 9 9.51 14.03 14.54 14.54 14.03 9.51 9 14.54 3.97"/>
        <path d="M15.5,1A1.5,1.5,0,0,1,17,2.5v13A1.5,1.5,0,0,1,15.5,17H2.5A1.5,1.5,0,0,1,1,15.5V2.5A1.5,1.5,0,0,1,2.5,1h13m0-1H2.5A2.5,2.5,0,0,0,0,2.5v13A2.5,2.5,0,0,0,2.5,18h13A2.5,2.5,0,0,0,18,15.5V2.5A2.5,2.5,0,0,0,15.5,0Z"/>
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