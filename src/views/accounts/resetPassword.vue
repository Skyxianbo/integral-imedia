<style lang="sass" scoped>
.icon-img {
    width: 28px;
    margin-top: 2px;
}
</style>
<template lang="html">
    <button class="btn btn-default margin-left-10" @click.prevent="routeGo()"><i class="fa fa-reply"></i> 返回主页</button>
    <login-panel title="请设置新密码">
        <div slot="login-panel-body" class="login-panel-body margin-top-20">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>请输入新密码</span>
                    </label>
                    <div class="col-sm-6">
                        <input type="password" class="form-control" placeholder="新密码为6-20位" v-model="password" v-on:blur="checkPassword()">
                    </div>
                    <div class="col-sm-1" v-if="password_icon">
                        <img class="icon-img" src="../../assets/images/true.psd.png" alt="image" v-if="password_icon == 1">
                        <img class="icon-img" src="../../assets/images/false.psd.png" alt="image" v-else>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>请确认新密码</span>
                    </label>
                    <div class="col-sm-6">
                        <input type="password" class="form-control" placeholder="新密码为6-20位" v-model="password1" v-on:blur="checkPassword()">
                    </div>
                    <div class="col-sm-1" v-if="password1_icon">
                        <img class="icon-img" src="../../assets/images/true.psd.png" alt="image" v-if="password1_icon == 1">
                        <img class="icon-img" src="../../assets/images/false.psd.png" alt="image" v-else>
                    </div>
                </div>
                <div class="form-group" v-if="warmContent">
                    <p class="text-red text-center">{{warmContent}}</p>
                </div>
                <div class="form-group">
                    <div class="col-sm-6 col-sm-offset-4">
                        <button class="btn btn-search margin-bottom-20" @click="resetPassword" :disabled="checked">完成</button>
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
            id: '',
            password: '',
            password1: '',
            warmContent: ''
        }
    },
    computed: {
        password_icon: function() {
            let length = this.password.length;
            if (length <= 0) {
                return 0;
            } else if (length >= 6 && length <= 20) {
                return 1;
            } else {
                return 2;
            }
        },
        password1_icon: function() {
            let length = this.password1.length;
            if (length <= 0) {
                return 0;
            } else if (length >= 6 && length <= 20) {
                return 1;
            } else {
                return 2;
            }
        },
        checked: function() {
            return this.password1 && this.password1 ? false : true;
        }
    },
    route: {
        data(transition) {
            if (transition.to.query.id) {
                this.id = transition.to.query.id;
            }
        }
    },
    ready() {},
    methods: {
        resetPassword() {
            this.requestApi('/madmin/set_passwd/' + this.id, {
                passwd: this.password
            }, (response) => {
                layer.msg('密码已重置，请重新登录');
                setTimeout(() => {
                    this.$route.router.go({
                        name: 'login'
                    });
                }, 500)
            });
        },
        checkPassword() {
            if (this.password && this.password1 && (this.password !== this.password1)) {
                this.warmContent = '您两次输入的新密码不一致，请重新输入';
            }
        },
        routeGo() {
            this.$route.router.go({
                name: 'login'
            });
        }
    }
}
</script>
