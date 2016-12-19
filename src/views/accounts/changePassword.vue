<style lang="sass" scoped>

</style>
<template lang="html">
    <header class="template-header">
        <span>修改密码</span>
    </header>
    <div class="content-body">
        <v-change-password :type="2" panel-class="changePassword-panel"></v-change-password>
    </div>
</template>
<script>
import vChangePassword from '../../components/v-changePassword.vue';
export default {
    components: {
        vChangePassword
    },
    data() {
        return {

        }
    },
    ready() {

    },
    methods: {

    }
}
</script>
