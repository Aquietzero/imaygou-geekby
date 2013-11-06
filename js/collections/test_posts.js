define(function (require) {
  var TestPosts = [{
    images: [
      'http://cdn.pingwest.com/wp-content/uploads/2013/10/HT_fitbit_ml_131009_16x9_992.jpg'
    ],
    price_cn: 1000,
    price_us: 2000,
    price_ref: [{
      mall: '淘宝',
      price: '2343'
    }, {
      mall: '天猫',
      price: '1212'
    }],
    delta: 213,
    product_src: {},
    title: '这个非常超值啊',
    sub_title: '错过这次就没有下次了',
    description: '无话可说，好得不得了',
    detail: [
      '啦啦啦啦啦',
      '汪汪汪汪汪',
      '喵喵喵喵喵'
    ],
    view_num: 8374,
    buy_num: 1231,

    post_type: 'hot'
  }, {
    images: [
      'http://cdn.pingwest.com/wp-content/uploads/2013/10/HT_fitbit_ml_131009_16x9_992.jpg'
    ],
    price_cn: 283,
    price_us: 2098,
    price_ref: [{
      mall: '淘宝',
      price: '2343'
    }],
    delta: 2839,
    product_src: {},
    title: '这个确实一般般',
    sub_title: '但是它非常非常便宜啊',
    description: '不买怎么就知道这是水货呢',
    detail: [
      '哞哞哞哞哞',
      '咯咯咯咯咯',
      '嘻嘻嘻嘻嘻'
    ],
    view_num: 290,
    buy_num: 12,

    post_type: 'normal'
  }];

  return TestPosts;
});

