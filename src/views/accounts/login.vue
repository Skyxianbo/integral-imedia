<style lang="sass">
.login-panel-body {
    .btn-search {
        width: 100%;
        padding: 5px;
    }
    p {
        margin: 0;
    }
}
</style>
<template lang="html">
    <login-panel title="登录" :footer="false" v-if="!show"> 
        <div slot="login-panel-body" class="login-panel-body margin-top-20">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>用户名</span>
                    </label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="login.accounts">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-sm-offset-1 control-label">
                        <span>密码</span>
                    </label>
                    <div class="col-sm-6">
                        <input type="password" class="form-control" v-model="login.passwd">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                        <button class="btn-search" @click.prevent="submit()">登录</button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-3" style="text-align: right">
                        <a @click="routerGo()"><h6>忘记密码?</h6></a>
                    </div>
                </div>
            </form>
        </div>
    </login-panel>
    <v-change-password :show.sync="show"></v-change-password>
</template>
<script>
import loginPanel from '../../components/login-panel.vue'; //引入login-panel组件
import vChangePassword from '../../components/v-changePassword.vue';
export default {
    components: {
        loginPanel,
        vChangePassword
    },
    data() {
        return {
            show: false,
            login: {
                accounts: "",
                passwd: ""
            }
        }
    },
    ready() {
    },
    methods: {
        submit() {
            let param = this.login;
            let url = '/madmin/login';
            $.ajax({
                type: "post",
                url: JST.HOST + url,
                data: param,
                success: (response) => {
                    if (response.status == JST.SUCCESS) {
                        this.accountsId = response.data.id;
                        let arr = response.data;
                        this.data = {
                            id: arr.id,
                            media_id: arr.media_id,
                            accounts: arr.accounts,
                            token_key: arr.token_key,
                            token_secret: arr.token_secret
                        }
                        sessionStorage.setItem('NUT_MEDIA_USER', JSON.stringify(this.data));
                        let vm = this;
                        if (response.data.init_flag == 0) {
                            this.show = true;
                        } else {
                            layer.load(2);
                            window.setTimeout(function() {
                                layer.closeAll('loading');
                                vm.$root.$dispatch('logined', vm.data);
                            }, 1000)
                        }
                    } else {
                        layer.msg(response.info);
                    }
                },
                error: (response) => {
                    layer.msg("与服务器失去连接")
                }
            })
        },
        routerGo() {
            this.$route.router.go({name: 'getPassword'});
            this.login = {
                accounts: '',
                passwd: ''
            }
        }
    }
}
</script>
