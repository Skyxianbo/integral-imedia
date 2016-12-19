<style lang="sass" scoped>
.panel-body label {
    font-size: 14px;
    margin-left: 10px;
}

.panel-body>.form-horizontal>.form-group .nav>li>a {
    padding: 2px 10px;
}

.panel-body>.nav>li>a {
    height: 40px;
}

.line-height-14 {
    line-height: 14px;
}

.line-height-30 {
    line-height: 30px;
}

.padding-top-7 {
    padding-top: 7px;
}

.padding-top-9 {
    padding-top: 9px;
}
</style>
<template lang="html">
    <!-- 标题和返回按钮 -->
    <header class="template-header">
        <span>{{title}}</span>
        <!-- 点击触发返回函数 -->
        <button class="btn btn-default margin-left-10" v-if="edit" @click.prevent="back()"><i class="fa fa-reply"></i> 返回商品列表</button>
    </header>
    <!-- 选项卡 -->
    <panel title="商品类型">
        <div slot="panel-body" class="panel-body">
            <ul class="nav nav-pills" v-if="!edit">
                <li :class="step == 1? 'active':''"><a class="line-height-14" @click="stepSwitch(1)">优惠券<br>(唯一码)</a></li>
                <li :class="step == 6? 'active':''"><a class="line-height-14" @click="stepSwitch(6)">优惠券<br>(通用码)</a></li>
                <li :class="step == 5? 'active':''"><a class="line-height-14" @click="stepSwitch(5)">优惠券<br>(链接)</a></li>
                <li :class="step == 2? 'active':''"><a class="line-height-30" @click="stepSwitch(2)">实物</a></li>
            </ul>
            <ul class="nav nav-pills" v-else>
                <li class="active" v-if="step == 1"><a class="line-height-14">优惠券<br>(唯一码)</a></li>
                <li class="active" v-if="step == 6"><a class="line-height-14">优惠券<br>(通用码)</a></li>
                <li class="active" v-if="step == 5"><a class="line-height-14">优惠券<br>(链接)</a></li>
                <li class="active" v-if="step == 2"><a class="line-height-30">实物</a></li>
            </ul>
        </div>
    </panel>
    <div class="tab-content">
        <!-- 展示信息模块，主要包含详细说明、使用说明两个富文本编辑器，以及图片上传 -->
        <panel title="展示信息">
            <div slot="panel-body" class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>商品名称</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="商品名称，用作后台显示及商品列表显示" v-model="productDetails.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>显示名称</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="显示名称，用做首页显示用" v-model="productDetails.name_show">
                        </div>
                    </div>
                    <div class="form-group" v-if="step == 6">
                        <label class="control-label col-sm-2">
                            <span>通用码</span>
                        </label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="填入通用码" v-model="productDetails.ticket_id">
                        </div>
                    </div>
                    <div class="form-group" v-if="step == 6 || step == 2">
                        <label class="control-label col-sm-2">
                            <span>库存数量</span>
                        </label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="填入库存数量，整数格式" v-model="productDetails.stocks">
                        </div>
                    </div>
                    <div class="form-group" v-if="step == 5">
                        <label class="control-label col-sm-2">
                            <span>跳转链接</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="请输入完整跳转链接，比如http://www.taobao.com/coupon?bagId=123&from=nuthd" v-model="productDetails.url">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>市面价值</span>
                        </label>
                        <div class="col-sm-5">
                            <input class="form-control" type="text" placeholder="该商品的市场价格或原价，仅作展示" v-model="productDetails.price">
                        </div>
                        <div class="col-sm-1">
                            <select class="form-control" v-model="productDetails.price_unit">
                                <option value="元">元</option>
                                <option value="积分">积分</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>图文详情</span>
                        </label>
                        <div class="col-sm-8">
                            <!-- 富文本编辑器editor -->
                            <textarea id="goodsDetails" placeholder="详细说明" autofocus></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>使用说明</span>
                        </label>
                        <div class="col-sm-8 simditor-sm">
                            <!-- 富文本编辑器editorUse -->
                            <textarea id="goodsUse" placeholder="使用说明" autofocus></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" style="padding-top: 3px;">
                            <span>商品图片</span>
                        </label>
                        <div class="col-sm-8">
                            <!-- 图片上传区域选项卡 -->
                            <ul class="nav nav-pills">
                                <li class="active" style="margin-left: 0;"><a href="#tab-img1" data-toggle="tab">详情图</a></li>
                                <li><a href="#tab-img2" data-toggle="tab">缩略图</a></li>
                                <li><a href="#tab-img3" data-toggle="tab">图标</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="tab-content">
                            <!-- 图片上传区域 -->
                            <div class="tab-pane active" id="tab-img1">
                                <div class="col-sm-8 col-sm-offset-2">
                                    <p class="text-red content-img">建议尺寸：750 x 400像素，JPG大小1M以内，PSD不限，图片非白底，左下角请不要添加文案</p>
                                </div>
                                <div class="col-sm-8 col-sm-offset-2">
                                    <!-- 图片上传 -->
                                    <upload-img :img-src.sync="productDetails.pic_banner" file-id="file1" upload-id="upload-1"></upload-img>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-img2">
                                <div class="col-sm-8 col-sm-offset-2">
                                    <p class="text-red content-img">建议尺寸：300 x 200像素，JPG大小40K以内，PSD不限，图片非白底</p>
                                </div>
                                <div class="col-sm-8 col-sm-offset-2">
                                    <!-- 图片上传 -->
                                    <upload-img :img-src.sync="productDetails.pic_thumb" file-id="file2" upload-id="upload-2"></upload-img>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-img3">
                                <div class="col-sm-8 col-sm-offset-2">
                                    <p class="text-red content-img">建议尺寸：100 x 70像素，JPG大小40K以内，PSD不限，列表图需要灰底，色号：f8f8f8</p>
                                </div>
                                <div class="col-sm-8 col-sm-offset-2">
                                    <!-- 图片上传 -->
                                    <upload-img :img-src.sync="productDetails.pic_icon" file-id="file3" upload-id="upload-3"></upload-img>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </panel>
        <panel title="兑换规则">
            <div slot="panel-body" class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>需要积分</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="请输入所需积分" v-model="productDetails.integral">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>用户累计兑换限制</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="每个用户累计最多可兑换的次数，0则无限制" v-model="productDetails.limit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>用户每日兑换限制</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="每个用户每日最多可兑换的次数，0则无限制" v-model="productDetails.day_limit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>额外兑换限制</span>
                        </label>
                        <div class="col-sm-6 padding-top-9">
                            <switch-input :callback="limit" :exchange-limit="exchangeLimit"></switch-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>每日限制额度</span>
                        </label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="每天最多可被兑换次数，0则无限制" disabled="{{!exchangeLimit}}" v-model="productDetails.day_all_limit">
                            <p class="text-red margin-top-10">您是否希望每天限额发放此兑换项</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>兑换日期限制</span>
                        </label>
                        <div class="col-sm-5 padding-left-0">
                            <div class="col-sm-5">
                                <input class="form-control" type="date" disabled="{{!exchangeLimit}}" v-model="productDetails.start_date">
                            </div>
                            <div class="col-sm-1 text-center padding-top-7">
                                <span>至</span>
                            </div>
                            <div class="col-sm-5">
                                <input class="form-control" type="date" disabled="{{!exchangeLimit}}" v-model="productDetails.end_date">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>兑换时间限制</span>
                        </label>
                        <div class="col-sm-5 padding-left-0">
                            <div class="col-sm-5">
                                <input class="form-control" type="time" disabled="{{!exchangeLimit}}" v-model="productDetails.start_time">
                            </div>
                            <div class="col-sm-1 text-center padding-top-7">
                                <span>至</span>
                            </div>
                            <div class="col-sm-5">
                                <input class="form-control" type="time" disabled="{{!exchangeLimit}}" v-model="productDetails.end_time">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </panel>
        <panel title="发货/取货设置" v-if="step == 2">
            <div slot="panel-body" class="panel-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>发货设置</span>
                        </label>
                        <div class="col-sm-9">
                            <label class="radio-inline col-lg-1 col-sm-2">
                                <input type="radio" name="inlineRadioOptions" id="radio1" value=1 v-model="productDetails.send_type">发货
                            </label>
                            <label class="radio-inline col-lg-1 col-sm-2">
                                <input type="radio" name="inlineRadioOptions" id="radio2" value=2 v-model="productDetails.send_type">取货
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>取货地址</span>
                        </label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="请输入取货地址" v-model="productDetails.take_address" :disabled="productDetails.send_type == 1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">
                            <span>取货时限</span>
                        </label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" placeholder="请输入取货时限" v-model="productDetails.over_time" :disabled="productDetails.send_type == 1">
                        </div>
                        <div class="col-sm-1">
                            <select class="form-control" :disabled="productDetails.send_type == 1">
                                <option>天</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </panel>
    </div>
    <footer>
        <!-- 点击调用新增商品函数 -->
        <button id="btn" class="btn button-primary" v-if="!edit">{{step == 1? '保存并导入券码' : '保存'}}</button>
        <!-- 点击调用保存编辑函数 -->
        <button class="btn button-primary" v-if="edit" @click.prevent="editProduct()">保存编辑</button>
        <button class="btn button-primary margin-left-5" @click.prevent="preview()">预览</button>
    </footer>
    <phone-modal :show.sync="show">
        <div slot="modal-body">
            <product-preview :product-detail="productDetails"></product-preview>
        </div>
    </phone-modal>
</template>
<script>
import panel from '../../components/panel'; //引入panel组件
import uploadImg from '../../components/upload-img'; //引入图片上传组件
import switchInput from '../../components/switch-input'; //引入switch组件
import phoneModal from '../../components/phone-modal';
import productPreview from '../../components/preview/product_preview';
export default {
    components: {
        panel,
        uploadImg,
        switchInput,
        phoneModal,
        productPreview
    },
    data() {
        return {
            productDetails: {}, //商品详情属性
            editor: {}, //富文本编辑器editor
            editorUse: {}, //富文本编辑器editorUse
            step: '',
            title: '', //标题
            productId: '', //接收从其他页面传进来的商品ID
            show: false,
            edit: false, //设置edit modal初始状态为隐藏
            exchangeLimit: false, //设置switch初始状态为false
            edited: false //用于表示当前页面是否从编辑状态转入新增状态，当该参数为true时，清空富文本编辑器的值
        }
    },
    route: {
        data(transition) {
            //发生路由跳转时执行的代码
            this.clearCondition();
            if (transition.to.query.id) {
                this.title = "编辑商品";
                this.edit = true;
                this.edited = true;
                this.productId = transition.to.query.id;
            } else {
                this.title = "添加商品";
                this.edit = false;
                this.productId = '';
                this.step = 1;
                //当edited为true时清空富文本编辑器的值
                this.edited ? this.editor.setValue('') && this.editorUse.setValue('') : '';
            }
        }
    },
    ready() {
        var btn = document.getElementById('btn');
        btn.addEventListener('click', this.debounce(this.insertProduct, 300))
        this.initEditor(); //初始化富文本编辑器
        this.getProduct(); //获取商品信息
    },
    methods: {
        //初始化富文本编辑器函数
        initEditor() {
            this.editor = new Simditor({
                textarea: $('#goodsDetails'),
                placeholder: '',
                params: {},
                upload: true,
                tabIndent: true,
                toolbar: [
                    'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'alignment'
                ],
                toolbarFloat: true,
                toolbarFloatOffset: 0,
                pasteImage: true,
                upload: {
                    url: JST.HOST + '/mproduct/uploadimg',
                    params: null,
                    fileKey: 'upload_file',
                    connectionCount: 3
                }
            });
            this.editorUse = new Simditor({
                textarea: $('#goodsUse'),
                placeholder: '',
                params: {},
                upload: true,
                tabIndent: true,
                toolbar: [
                    'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'alignment'
                ],
                toolbarFloat: true,
                toolbarFloatOffset: 0,
                pasteImage: true,
                upload: {
                    url: JST.HOST + '/mproduct/uploadimg',
                    params: null,
                    fileKey: 'upload_file',
                    connectionCount: 3,
                    leaveConfirm: '正在上传，确定要取消上传文件吗？'
                }
            })
        },
        //新增商品函数
        insertProduct() {
            let param = this.productDetails;
            param.type = this.step;
            param.content = this.resizeImg(this.resizeFontSize(this.editor.getValue()));
            param.content_use = this.resizeImg(this.resizeFontSize(this.editorUse.getValue()));
            this.requestApi("/mproduct/insert", param, (response) => {
                let info = this.step == 1 ? "已保存，请前往添加券码" : "已保存";
                layer.msg(info, {
                    time: 1000
                }, () => {
                    this.$route.router.go({
                        name: "goodsList"
                    });
                });
            })
        },
        //编辑商品函数
        editProduct() {
            let param = this.productDetails;
            param.type = this.step;
            param.content = this.resizeImg(this.resizeFontSize(this.editor.getValue()));
            param.content_use = this.resizeImg(this.resizeFontSize(this.editorUse.getValue()));
            this.requestApi("/mproduct/update/" + this.productId, param, (response) => {
                layer.msg("已保存", {
                    time: 1000
                }, () => {
                    this.$route.router.go({
                        name: "goodsList"
                    });
                });
            })
        },
        //编辑时获取商品信息
        getProduct() {
            //设置富文本编辑器工具栏距顶部距离为50px
            $(".simditor-toolbar").css("top", "50px");
            // 当插入内容超出富文本编辑器限制宽度时隐藏内容并可进行水平滚动
            $(".simditor-body").css("overflow-x", "auto");
            if (this.productId) {
                this.requestApi("/mproduct/get/" + this.productId, {}, (response) => {
                    this.step = response.data.type;
                    this.productDetails = response.data;
                    this.editor.setValue(this.productDetails.content);
                    this.editorUse.setValue(this.productDetails.content_use);
                    this.productDetails.start_date = response.data.start_date? response.data.start_date.split(' ')[0] : '';
                    this.productDetails.end_date = response.data.end_date? response.data.end_date.split(' ')[0] : '';
                    let data = this.productDetails;
                    this.exchangeLimit = (data.day_all_limit || data.start_date || data.end_date || data.start_time || data.end_time) ? true : false;
                })
            } else {
                this.step = 1;
            }
        },
        //重置函数
        clearCondition() {
            this.productDetails = {
                name: '',
                type: '',
                price: '',
                price_unit: '元',
                integral: '',
                content: '',
                content_use: '',
                status: 1,
                name_show: '',
                url: '',
                stocks: '',
                ticket_id: '',
                send_type: 1,
                open_flag: 2,
                take_address: '',
                over_time: ''
            };
            this.exchangeLimit = false;
        },
        //更改switch状态函数
        limit() {
            this.exchangeLimit = !this.exchangeLimit;
        },
        //更改选项卡状态函数
        stepSwitch(step) {
            this.step = step;
            window.scrollTo(0, 0);
        },
        preview() {
            console.log(this.editor.getValue());
            console.log(this.editorUse.getValue());
            this.productDetails.content = this.resizeImg(this.resizeFontSize(this.editor.getValue()));
            this.productDetails.content_use = this.resizeImg(this.resizeFontSize(this.editorUse.getValue()));
            this.show = true;
        },
        debounce(callback, delay) {
            var timer = null;
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    callback();
                }, delay)
            }
        }
    }
}
</script>
