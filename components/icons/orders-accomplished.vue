<template>
    <g>
        <rect v-if="showBackground" :fill="backgroundColor" width="18" height="18" rx="2.5" ry="2.5"/>
        <path d="M16,1a1,1,0,0,1,1,1V16a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H16m0-1H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2Z"/>
        <path d="M8.39,12.05h0a.75.75,0,0,1-.55-.25L5.77,9.52a.75.75,0,1,1,1.11-1L8.41,10.2l3.8-4a.75.75,0,1,1,1.09,1L8.94,11.82A.75.75,0,0,1,8.39,12.05Z"/>
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