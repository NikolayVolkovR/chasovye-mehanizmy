<template>
    <g>
        <rect v-if="showBackground" :fill="backgroundColor" width="18" height="18" rx="2.5" ry="2.5"/>
        <path class="cls-2" d="M16,1a1,1,0,0,1,1,1V16a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H16m0-1H2A2,2,0,0,0,0,2V16a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2Z"/>
        <path class="cls-2" d="M12.17,11.08,10.09,9l2.08-2.08a.77.77,0,0,0-1.09-1.09L9,7.91,6.92,5.84A.77.77,0,0,0,5.83,6.92L7.91,9,5.83,11.08a.77.77,0,1,0,1.09,1.09L9,10.09l2.08,2.08a.77.77,0,1,0,1.09-1.09Z"/>
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