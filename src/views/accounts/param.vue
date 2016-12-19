<style lang="sass" scoped>
input {
    width: 300px;
}

.question-mark {
    color: blue;
    font-size: 16px;
    font-weight: 600;
}

img {
    height: 650px;
}
</style>
<template lang="html">
    <!-- 标题 -->
    <header class="template-header">
        <span>账号设置</span>
    </header>
    <div class="content-body">
        <form class="form-horizontal">
            <div class="form-group margin-top-20">
                <label class="control-label col-sm-2 col-lg-1">
                    <span>标题修改</span>
                </label>
                <div class="col-sm-6">
                    <input type="text" class="input-sm" v-model="param.imall_title">
                    <span class="margin-left-10 question-mark" v-on:mouseover="hover(1, 0)" v-on:mouseout="hover(1, 1)">?</span>
                    <button class="btn-search margin-left-15" @click.prevent="setParam()">保存修改</button>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2 col-lg-1">
                    <span>复制链接</span>
                </label>
                <div class="col-sm-6">
                    <input type="text" class="input-sm" id="url" v-model="param.url">
                    <span class="margin-left-10 question-mark" v-on:mouseover="hover(2, 0)" v-on:mouseout="hover(2, 1)">?</span>
                    <button class="btn-search margin-left-15" @click.prevent="copyUrl()">复制链接</button>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-1">
                    <img src="../../assets/images/titleModify.jpg" alt="image" v-if="image1">
                    <img src="../../assets/images/controlUrl.png" alt="image" v-if="image2">
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
            return {
                id: '',
                image1: false,
                image2: false,
                param: {
                    imall_title: '',
                    url: ''
                }
            }
        },
        ready() {
            this.getParam();
        },
        methods: {
            getParam() {
                this.id = JSON.parse(sessionStorage.getItem('NUT_MEDIA_USER')).id;
                this.requestApi('/madmin/get/' + this.id, {}, (response) => {
                    this.param = response.data;
                })
            },
            setParam() {
                this.requestApi('/madmin/imall_title/' + this.id, {
                    imall_title: this.param.imall_title
                }, (response) => {
                    layer.msg('已保存修改');
                })
            },
            copyUrl() {
                let Url = document.getElementById('url');
                Url.select();
                document.execCommand('Copy');
                layer.msg('链接已复制');
            },
            hover(type, status) {
                if (type == 1) {
                    this.image1 = status? false : true;
                } else {
                    this.image2 = status? false : true;
                }
            }
        }
}
</script>
