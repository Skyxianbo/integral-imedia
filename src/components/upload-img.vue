<style lang="sass" scoped>
.uploadImg-images {
    padding-top: 13px;
    img {
        z-index: 100;
        margin: 2px;
    }
    .cover {
        position: relative;
        outline: 1px dashed #ddd;
        float: left;
        margin-left: 10px;
        line-height: 100px;
        text-align: center;
        cursor: pointer;
        .fa {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -5px;
            margin-top: -5px;
        }
    }
}
</style>
<template lang="html">
    <div class="upload-img">
        <slot name="upload-img-body">
            <div class="uploadImg-body">
                <form :id="uploadId">
                    <div class="uploadImg-images">
                        <div class="cover flex flex-middle" @click="uploadFile(fileId)" :width="width" :height="height">
                            <i class="fa fa-plus fa-lg"></i>
                            <img class="img-preview" :src="imgSrc" alt="" :width="width" :height="height">
                        </div>
                        <input :id="fileId" class="fill hide" type="file" name="file" @change="submit()">
                    </div>
                </form>
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        fileId: {
            type: String,
            default: ''
        },
        apiUrl: {
            type: String,
            default: ''
        },
        uploadId: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '100px'
        }
    },
    data() {
        return {

        }
    },
    methods: {
        uploadFile(fileId) {
            $("#" + fileId).click();
        },
        submit() {
            let user = JSON.parse(sessionStorage.getItem("NUT_MEDIA_USER"));
            $("#" + this.uploadId).ajaxSubmit({
                type: 'post', // 提交方式 get/post
                url: JST.HOST + '/mproduct/uploadImg', // 需要提交的 url
                async: false,
                headers: {
                    "Media-Id": user.media_id,
                    "Token-Key": user.token_key,
                    'Token-Secret': user.token_secret
                },
                beforeSubmit: () => {
                    let size = event.target.files[0].size;
                    if (size > 1024000) {
                        layer.msg('图片大小不得超过1MB', () => {})
                        return false;
                    }

                },
                success: (response) => { // response 保存提交后返回的数据，一般为 json 数据
                    response.success == true ? this.imgSrc = response.file_path : layer.msg(response.msg);
                }
            });
        }
    }
}
</script>
