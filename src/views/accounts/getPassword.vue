<style lang="sass">
.captcha {
    margin-left: -10px;
}
</style>
<template lang="html">
    <button class="btn btn-default margin-left-10" @click.prevent="routeGo()"><i class="fa fa-reply"></i> 返回主页</button>
    <login-panel title="找回密码">
        <div slot="login-panel-body" class="login-panel-body margin-top-20">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>输入您的账号</span>
                    </label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" v-model="accounts">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>验证码</span>
                    </label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control" v-model="identifyCode">
                    </div>
                    <div class="col-sm-3">
                        <input type="button" class="btn-search captcha" @click.prevent="sendCode()" value="发送验证码"></input type="button">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-4">
                        <button class="btn btn-search margin-bottom-20" @click.prevent="getPassword" :disabled="checked">找回</button>
                    </div>
                </div>
            </form>
        </div>
    </login-panel>
</template>
<script>
import loginPanel from '../../components/login-panel.vue';
export default {
    components: {
        loginPanel
    },
    data() {
        return {
            accounts: '',
            identifyCode: '',
            code: '',
        }
    },
    computed: {
        checked: function() {
            if (this.accounts && this.identifyCode) {
                return false;
            } else {
                return true;
            }
        }
    },
    ready() {},
    methods: {
        getPassword() {
            let param = {
                accounts: this.accounts,
                captcha: this.identifyCode
            };
            this.requestApi('/madmin/validate_user', param, (response) => {
                setTimeout(() => {
                    this.$route.router.go({
                        name: 'resetPassword',
                        query: {
                            id: response.data.id
                        }
                    });
                }, 500)
            })
        },
        sendCode() {
            this.requestApi('/madmin/send_captcha', {
                accounts: this.accounts
            }, (response) => {
                layer.msg('验证码已发送');
            })
        },
        routeGo() {
            this.$route.router.go({
                name: 'login'
            });
        }
    }
}
</script>
