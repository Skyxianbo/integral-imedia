<style lang="sass">
.login-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -142px;
    width: 500px;
    border: 1px solid #bbb;
    .login-panel-header {
        h2 {
            text-align: center;
            margin: 2rem;
        }
    }
    .login-panel-footer {
        margin: 2rem auto;
    }
}
</style>
<template lang="html">
    <div class="login-panel">
        <slot name="login-panel-header">
            <div class="login-panel-header">
                <h2>{{title}}</h2>
            </div>
        </slot>
        <slot name="login-panel-body">
        </slot>
        <slot name="login-panel-footer">
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        callback: {
            type: Function,
            default () {}
        }
    }
}
</script>
