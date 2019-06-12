<template>

</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "DocManagment",
        computed: {
            ...mapState({
                docs: state => state.documents.documents
            })
        }
    }
</script>

<style scoped>

</style>
