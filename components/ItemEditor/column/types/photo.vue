<template>
    <td>
        <div class="photos">
            <div class="photo" v-for="photo in photos">
                <img :src="photo.src" :class="column.stretch ? photo.orientation : 'vertical'" />
            </div>
        </div>
    </td>
</template>

<script>
    export default {
        props: {
            column: Object,
            item: Object
        },
        computed: {
            photos() {
                if (this.column.single) {
                    return this.item[this.column.attribute]
                } else {
                    return this.item.photos
                }
            },
            className() {
                //stretch
            }
        }
    }
</script>

<style scoped>
    td {

    }
    .photos {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .photo:first-child{
        width: 100px;
        height: 100px;
    }

    .photo {
        width: 47px;
        height: 47px;
        overflow: hidden;
        border-radius: 5px;
        margin: 0 5px 5px 0;
    }
    .photo img {
        margin: 0;
        padding: 0;
    }

    .photo img.vertical {
        width: 100%;
    }
    .photo img.horizontal {
        height: 100%;
    }
</style>