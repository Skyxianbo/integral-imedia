<style lang="sass" scoped>
.icon-img {
    width: 20px;
    margin-top: 5px;
    margin-left: -20px;
}

.changePassword-panel {
    position: relative;
    margin: 100px auto;
    width: 500px;
    border: 1px solid #bbb;
    h2 {
        text-align: center;
        margin: 2rem;
    }
}

.init-changePassword {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -142px;
    width: 500px;
    border: 1px solid #bbb;
    h2 {
        text-align: center;
        margin: 2rem;
    }
}

.btn-search {
    width: 100%;
}
</style>
<template lang="html">
    <div :class="panelClass" v-if="show">
        <h2>{{title}}</h2>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-3 col-sm-offset-1 control-label">
                    <span>请输入{{password_str}}</span>
                </label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" v-model="password">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 col-sm-offset-1 control-label">
                    <span>请输入{{new_password_str}}</span>
                </label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" v-model="new_password" v-on:blur="checkPassword()">
                </div>
                <div class="col-sm-1" v-if="new_password_icon">
                    <img class="icon-img" src="../assets/images/true.psd.png" alt="image" v-if="new_password_icon == 1">
                    <img class="icon-img" src="../assets/images/false.psd.png" alt="image" v-else>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 col-sm-offset-1 control-label">
                    <span>请确认{{new_password_str}}</span>
                </label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" v-model="new_password1" v-on:blur="checkPassword()">
                </div>
                <div class="col-sm-1" v-if="new_password1_icon">
                    <img class="icon-img" src="../assets/images/true.psd.png" alt="image" v-if="new_password1_icon == 1">
                    <img class="icon-img" src="../assets/images/false.psd.png" alt="image" v-else>
                </div>
            </div>
            <div class="form-group" v-if="warmContent">
                <p class="text-red text-center">{{warmContent}}</p>
            </div>
            <div class="form-group">
                <div class="col-sm-4 col-sm-offset-4">
                    <button class="btn btn-search margin-bottom-20" @click.prevent="changePassword" :disabled="checked">确定</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: Number,
            default: 1
        },
        panelClass: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        new_password_icon: function() {
            let length = this.new_password.length;
            if (length <= 0) {
                return 0;
            } else if (length >= 6 && length <= 20) {
                return 1;
            } else {
                return 2;
            }
        },
        new_password1_icon: function() {
            let length = this.new_password1.length;
            if (length <= 0) {
                return 0;
            } else if (length >= 6 && length <= 20) {
                return 1;
            } else {
                return 2;
            }
        },
        checked: function() {
            if (this.password && this.new_password && this.new_password1) {
                return false;
            } else {
                return true;
            }
        },
        title: function() {
            return this.type == 1? '首次登录修改密码' : '修改密码';
        },
        password_str: function() {
            return this.type == 1? '初始密码' : '旧密码';
        },
        new_password_str: function() {
            return this.type == 1? '重设密码' : '新密码';
        }
    },
    data() {
        return {
            password: '',
            new_password: '',
            new_password1: '',
            warmContent: ''
        }
    },
    ready() {},
    methods: {
        checkPassword() {
            if (this.password && this.new_password && this.new_password1) {
                if (this.new_password_icon == 1 && this.new_password1_icon == 1) {
                    if (this.new_password !== this.new_password1) {
                        this.warmContent = '您两次输入的' + this.new_password_str + '不一致，请重新输入！';
                    } else if (this.new_password == this.password) {
                        this.warmContent = '您输入的' + this.new_password_str + '和' + this.password_str + '相同，请重新输入';
                    } else {
                        this.warmContent = '';
                    }
                } else {
                    this.warmContent = '重置密码长度须为6-20';
                }
            }
        },
        changePassword() {
            let id = JSON.parse(sessionStorage.getItem('NUT_MEDIA_USER')).id;
            this.requestApi('/madmin/change_passwd/' + id, {
                passwd: this.password,
                new_passwd: this.new_password
            }, (response) => {
                layer.msg('密码已修改，请重新登录', {
                    time: 1000
                }, () => {
                    sessionStorage.removeItem('NUT_MEDIA_USER');
                    this.$root.$dispatch('logout', true);
                    this.show = false;
                })
            })
        }
    }
}
</script>
