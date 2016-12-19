<style lang="sass">
.table-footer button {
    padding: 0 5px;
    font-size: 12px;
    border-radius: 5px;
}

.url-copy {
    position: absolute;
    z-index: -999;
}
</style>
<template lang="html">
    <v-list title="查询活动" :source.sync="source" :count.sync="count" :pages.sync="pages" :search="currentSearch" :list.sync="activityList">
        <div slot="list-search">
            <div class="col-sm-2 col-lg-1">
                <select class="form-control" v-model="currentSearch.type">
                    <option value="{{$index}}" v-for="type in activityType">{{type}}</option>
                </select>
            </div>
            <div class="col-sm-2 col-lg-1">
                <select class="form-control" v-model="currentSearch.status">
                    <option value="{{$index}}" v-for="status in activityStatus">{{status}}</option>
                </select>
            </div>
            <div class="col-sm-2 col-lg-1">
                <select class="form-control" v-model="currentSearch.origin_type">
                    <option :value="0">所有来源</option>
                    <option :value="1">坚果互动</option>
                    <option :value="2">电视台</option>
                </select>
            </div>
            <div class="col-sm-4 col-lg-3">
                <input class="form-control" type="text" placeholder="活动标题" v-model="currentSearch.name">
            </div>
        </div>
        <div slot="list-table">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-center" v-if="source == 2">
                            <input type="checkbox" v-model="allChecked" @click="checkedAll()">
                        </th>
                        <th>活动标题</th>
                        <th>活动副标题</th>
                        <th>状态</th>
                        <th>活动类型</th>
                        <th>活动来源</th>
                        <th>参与记录</th>
                        <th v-if="source == 2">操作</th>
                        <th>活动链接</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="item" v-for="item in activityList">
                        <td class="text-center" v-if="source == 2">
                            <input type="checkbox" v-model="item.checked" @click="checked($index)">
                        </td>
                        <td>
                            <div v-if="source == 2">
                                <a @click="routerGo(routerName[1], item.id)">
                                    <img alt="image" :src="item.pic_icon">
                                    <span class="margin-left-10">{{item.name}}</span>
                                </a>
                            </div>
                            <div v-else>
                                <img :src="item.pic_icon" alt="image">
                                <span class="margin-left-10">{{item.name}}</span>
                            </div>
                        </td>
                        <td>{{item.desc}}</td>
                        <td>{{item.status_str}}</td>
                        <td>{{item.type_str}}</td>
                        <td>{{item.origin_type == 1? '坚果互动' : '电视台'}}</td>
                        <td>
                            <a @click="routerGo(routerName[0], item.id, item.name, item.media_name)">{{item.play_count}}</a>
                        </td>
                        <td v-if="source == 2">
                            <a @click="changeStatus(0, item)">{{item.status == 2? '下线' : '上线'}}</a>
                            <a class="margin-left-10" @click="routerGo(routerName[1], item.id)">编辑</a>
                            <a class="margin-left-10" @click="preview(item.id)">预览</a>
                        </td>
                        <td>
                            <input type="text" class="url-copy" id="url{{$index}}" v-model="item.url">
                            <button class="btn-search" @click="copyUrl($index)">复制链接</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-list>
    <phone-modal :show.sync="show">
        <div slot="modal-body">
            <activity-preview :activity-type.sync="type" :activity-detail="activityDetail" :show="show"></activity-preview>
        </div>
    </phone-modal>
</template>
<script>
import vList from '../../components/v_list';
import phoneModal from '../../components/phone-modal';
import activityPreview from '../../components/preview/activity_preview';
export default {
    components: {
        vList,
        phoneModal,
        activityPreview
    },
    data() {
        return {
            activityList: [],
            activityDetail: {},
            type: 0,
            count: 0,
            source: 1,
            show: false,
            allChecked: false,
            activityType: ['所有类型', '刮刮卡', '有奖问答', 'H5小游戏'],
            activityStatus: ['所有状态', '下线', '上线'],
            routerName: ['participation', 'activityEdit'],
            currentSearch: {
                type: 0,
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
    watch: {
        show(value) {
            if (!value) {
                this.type = 0;
            }
        }
    },
    ready() {},
    methods: {
        getList(type) {
            type ? this.layerLoad() : '';
            let param = this.currentSearch;
            this.requestApi("/mactivity/get_list", param, (response) => {
                if (response.status == JST.SUCCESS) {
                    this.activityList = this.initList(response.data.list);
                    this.pages.total = response.data.count;
                    this.pages.currentPage = response.data.p;
                    this.source = param.origin_type;
                    this.allChecked = false;
                    this.count = 0;
                    window.scrollTo(0, 0);
                }
            })
        },
        clearCondition() {
            this.currentSearch = {
                type: 0,
                status: 2,
                name: '',
                origin_type: 2
            };
        },
        changeStatus(type, item) {
            if (item) {
                let status = '';
                item.status == 1 ? status = 2 : status = 1;
                layer.msg(`确定${this.activityStatus[status]}该活动吗？`, {
                    time: 0,
                    shade: 0.2,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    yes: (index) => {
                        layer.close(index);
                        this.requestApi('/mactivity/status/' + item.id, {
                            status: status
                        }, (response) => {
                            layer.msg(`操作成功，已${this.activityStatus[status]}1个活动`);
                            this.getList();
                        })
                    }
                });
            } else {
                layer.msg(`确定批量${this.activityStatus[type]}选中活动吗？`, {
                    time: 0,
                    shade: 0.2,
                    shadeClose: true,
                    btn: ['确定', '取消'],
                    yes: (index) => {
                        layer.close(index);
                        let id = [];
                        this.activityList.forEach((x) => {
                            x.checked ? id.push(x.id) : '';
                        });
                        this.requestApi('/mactivity/status/' + id, {
                            status: type
                        }, (response) => {
                            layer.msg(`操作成功，已${this.activityStatus[type]}${id.length}个活动`);
                            this.getList();
                        })
                    }
                });
            }
        },
        checked(index) {
            this.count = 0;
            this.activityList[index].checked = !this.activityList[index].checked;
            let all = 1;
            this.activityList.forEach((x) => {
                all = all && x.checked;
                x.checked == 1 ? this.count++ : '';
            });
            this.allChecked = all;
        },
        checkedAll() {
            this.count = 0;
            this.activityList.forEach((x) => {
                x.checked = this.allChecked ? 0 : 1;
                if (x.checked == 1) {
                    this.count++;
                }
            })
        },
        copyUrl(index) {
            var Url = document.getElementById("url" + index);
            Url.select();
            document.execCommand("Copy");
            layer.msg("已复制好，可粘贴");

        },
        // 路由跳转函数
        routerGo(name, id, activityName, media_name) {
            this.$route.router.go({
                name: name,
                query: {
                    id: id,
                    activityName: activityName,
                    media_name: media_name
                }
            })
        },
        preview(id) {
            this.requestApi('/mactivity/get/' + id, {}, (response) => {
                this.activityDetail = response.data;
                this.type = response.data.type;
                this.show = true;
            })
        }
    }
}
</script>
