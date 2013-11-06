define(function (require) {

  // return url params as a dictionary
  // e.g. 
  //
  //     ?foo=123&bar=234
  //     
  // will be return as
  //     
  //     {
  //       foo: 123,
  //       bar: 234
  //     }
  function getQuery() {
    var a = (window.location.search.substr(1).split('&'));
    if (a === "") {
      return {};
    }
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p=a[i].split('=');
      if (p.length !== 2) {
        continue;
      }
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  }

  function logPostVisit(postId) {
    var param = {};

    var re = /#post\/[a-z0-9]+\/([a-z0-9]+)/i;
    var groups = window.location.hash.match(re);
    if (groups && groups[1]) {
      param.refcode = groups[1];
    }

    $.ajax({
      url: '/api/posts/' + postId + '/visited?' + $.param(param),
      method: 'GET'
    });
  }

  function logItemVisit(itemId) {
    $.ajax({
      url: '/api/items/' + itemId + '/visited',
      method: 'GET'
    });
  }

  return {
    getQuery: getQuery,
    logPostVisit: logPostVisit,
    logItemVisit: logItemVisit
  };
});

