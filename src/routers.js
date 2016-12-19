export default function(router) {
    router.map({
        '/login': {
          name: 'login',
          component: require('./views/accounts/login.vue'),
          auth: false
        },
        '/goods/insert': {
          name: 'goodsEdit',
          component: require('./views/goods/insert.vue'),
          auth: true,
          param: true
        },
        '/goods/list': {
          name: 'goodsList',
          component: require('./views/goods/list.vue'),
          auth: true,
          param: true
        },
        '/goods/importCoupon': {
          name: 'importTicket',
          component: require('./views/goods/importCoupon.vue'),
          auth: true,
          param: true
        },
        '/goods/couponList': {
          name: 'couponList',
          component: require('./views/goods/couponList.vue'),
          auth: true,
          param: true
        },
        '/activity/insert': {
          name: 'activityEdit',
          component: require('./views/activity/insert.vue'),
          auth: true,
          param: true
        },
        '/activity/list': {
          name: 'activityList',
          component: require('./views/activity/list.vue'),
          auth: true,
          param: true
        },
        '/activity/participation': {
          name: 'participation',
          component: require('./views/activity/participation.vue'),
          auth: true,
          param: true
        },
        '/order/list': {
          component: require('./views/order/list.vue'),
          auth: true
        },
        '/order/readySend': {
          component: require('./views/order/readySend.vue'),
          auth: true
        },
        '/order/orderDetail': {
          name: 'orderDetail',
          component: require('./views/order/orderDetail.vue'),
          auth: true
        },
        '/order/readyTake': {
          name: 'readyTake',
          component: require('./views/order/readyTake.vue'),
          auth: true
        },
        '/order/overtime': {
          name: 'overtime',
          component: require('./views/order/overtime.vue'),
          auth: true
        },
        '/banner/insert': {
          name: 'bannerEdit',
          component: require('./views/banner/insert.vue'),
          auth: true
        },
        '/banner/list': {
          name: 'bannerList',
          component: require('./views/banner/list.vue'),
          auth: true
        },
        '/commend/insert': {
          name: 'commendEdit',
          component: require('./views/commend/insert.vue'),
          auth: true
        },
        '/commend/list': {
          name: 'commendList',
          component: require('./views/commend/list.vue'),
          auth: true
        },
        '/accounts/param': {
          component: require('./views/accounts/param.vue'),
          auth: true
        },
        '/accounts/changePassword': {
          name: 'changePassword',
          component: require('./views/accounts/changePassword.vue'),
          auth: true
        },
        '/accounts/getPassword': {
          name: 'getPassword',
          component: require('./views/accounts/getPassword.vue'),
          auth: false
        },
        '/accounts/resetPassword': {
          name: 'resetPassword',
          component: require('./views/accounts/resetPassword.vue'),
          auth: false
        },
  });

}
