<style lang="sass">
.table>tbody>tr>td {
    vertical-align: middle;
}

.table {
    margin-top: 20px;
    img {
        width: 100px;
        span {
            margin-left: 10px;
        }
    }
}

footer button {
    margin-left: 10px;
}
</style>
<template lang="html">
    <v-list title="查询商品" :type="1" :source.sync="source" :count.sync="count" :pages.sync="pages" :search="currentSearch" :list.sync="productList">
        <div slot="list-search">
            <div class="col-sm-2">
                <select class="form-control" v-model="currentSearch.type">
                    <option value="">所有类型</option>
                    <option value="1">优惠券(唯一码)</option>
                    <option value="6">优惠券(通用码)</option>
                    <option value="5">优惠券(链接)</option>
                    <option value="2">实物</option>
                </select>
            </div>
            <div class="col-sm-2 col-lg-1">
                <select class="form-control" v-model="currentSearch.status">
                    <option value="{{$index}}" v-for="status in goodsStatus">{{status}}</option>
                </select>
            </div>
            <div class="col-sm-2 col-lg-1">
                <select class="form-control" v-model="currentSearch.origin_type">
                    <option :value="0">所有来源</option>
                    <option :value="2">电视台</option>
                    <option :value="1">坚果互动</option>
                </select>
            </div>
            <div class="col-sm-4 col-lg-3">
                <input class="form-control" type="text" placeholder="请输入名称关键字" v-model="currentSearch.name">
            </div>
        </div>
        <div slot="list-table">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-center">
                            <input type="checkbox" v-model="allChecked" @click="checkedAll()" v-if="source == 2">
                        </th>
                        <th>商品名称</th>
                        <th>显示名称</th>
                        <th>类型</th>
                        <th>来源</th>
                        <th v-if="source == 2">状态</th>
                        <th>兑换积分</th>
                        <th>库存</th>
                        <th v-if="source == 2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="item" v-for="item in productList">
                        <td class="text-center">
                            <input type="checkbox" v-model="item.checked" @click="checked($index)" v-if="source == 2">
                        </td>
                        <td>
                            <div v-if="source == 2">
                                <a @click.prevent="routerGo(routeName[2], item.id)">
                                    <img alt="image" :src="item.pic_icon">
                                    <span class="margin-left-10">{{item.name}}</span>
                                </a>
                            </div>
                            <div v-else>
                                <img alt="image" :src="item.pic_icon">
                                <span class="margin-left-10">{{item.name}}</span>
                            </div>
                        </td>
                        <td>{{item.name_show}}</td>
                        <td>{{item.type_str}}</td>
                        <td>{{item.origin_type == 2? '电视台' : '坚果互动'}}</td>
                        <td v-if="source == 2">{{item.status_str}}</td>
                        <td>{{parseInt(item.integral)}} 积分</td>
                        <td>
                            <div v-if="source == 2">
                                <div v-if="item.type == 1">
                                    <a @click.prevent="routerGo(routeName[0], item.id, item.name)">{{item.stocks}}</a>
                                    <a @click.prevent="routerGo(routeName[1], item.id, item.name)" v-if="source == 2">导入</a>
                                </div>
                                <div v-else>
                                    <span>{{item.stocks}}</span>
                                </div>
                            </div>
                        </td>
                        <td v-if="source == 2">
                            <a @click.prevent="changeStatus(0, item)">{{item.status == 2? '下架' : '上架'}}</a>
                            <a class="margin-left-10" @click.prevent="routerGo(routeName[2], item.id)">编辑</a>
                            <a class="margin-left-10" @click="preview(item)">预览</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-list>
    <phone-modal :show.sync="show">
        <div slot="modal-body">
            <product-preview :product-detail="productDetail"></product-preview>
        </div>
    </phone-modal>
</template>
<script>
import vList from '../../components/v_list';
import phoneModal from '../../components/phone-modal';
import productPreview from '../../components/preview/product_preview';
export default {
    components: {
        vList,
        phoneModal,
        productPreview
    },
    data() {
        return {
            productList: [],
            productDetail: {},
            count: 0,
            source: 2,
            show: false,
            allChecked: false,
            goodsStatus: ['所有状态', '下架', '上架'],
            routeName: ['couponList', 'importTicket', 'goodsEdit'],
            currentSearch: {
                type: '',
                status: 2,
                name: '',
                origin_type: 2
            },
            pages: {
                currentPage: 1,
                perPage: JST.PERPAGE,
                total: 0
            }
        }
    },
    ready() {

    },
    methods: {
        getList(type) {
            type ? this.layerLoad() : '';
            let param = this.currentSearch;
            this.requestApi("/mproduct/get_list", param, (response) => {
                this.productList = this.initList(response.data.list);
                this.pages.currentPage = response.data.p;
                this.pages.total = this.currentSearch.type? response.data.count : response.data.count - 1;
                this.source = param.origin_type;
                this.allChecked = false;
                this.count = 0;
                this.productList = this.productList.filter((x) => {
                    return x.type !== 4;
                });
            })
        },
        clearCondition() {
            this.currentSearch = {
                type: '',
                status: 2,
                name: '',
                origin_type: 2
            };
        },
        changeStatus(type, item) {
            if (type == 0) {
                let status = item.status == 1 ? 2 : 1;
                layer.msg(`确定${this.goodsStatus[status]}该商品吗？`, {
                    time: 0,
                    shade: 0.2,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    yes: (index) => {
                        layer.close(index);
                        this.requestApi('/mproduct/status/' + item.id, {
                            status: status
                        }, (response) => {
                            layer.msg(`操作成功，已${this.goodsStatus[status]}1个商品`);
                            this.getList();
                        })
                    }
                });
            } else {
                layer.msg(`确定批量${this.goodsStatus[type]}选中商品吗？`, {
                    time: 0,
                    shade: 0.2,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    yes: (index) => {
                        layer.close(index);
                        let id = [];
                        this.productList.forEach((x) => {
                            x.checked ? id.push(x.id) : '';
                        });
                        this.requestApi('/mproduct/status/' + id, {
                            status: type
                        }, (response) => {
                            layer.msg(`操作成功，已${this.goodsStatus[type]}${id.length}个商品`);
                            this.getList();
                        })
                    }
                });
            }
        },
        checked(index) {
            this.count = 0;
            this.productList[index].checked = !this.productList[index].checked;
            let all = 1;
            this.productList.forEach((x) => {
                all = all && x.checked;
                x.checked == 1 ? this.count++ : '';
            });
            this.allChecked = all;
        },
        checkedAll() {
            this.count = 0;
            this.productList.forEach((x) => {
                x.checked = this.allChecked ? 0 : 1;
                x.checked == 1 ? this.count++ : '';
            })
        },
        routerGo(name, id, productName) {
            this.$route.router.go({
                name: name,
                query: {
                    id: id,
                    productName: productName
                }
            })
        },
        preview(item) {
            this.productDetail = item;
            this.show = true;
        }
    }
}
</script>
