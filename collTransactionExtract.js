/**
    {
        "api":1,
        "name":"Extract requests from collection",
        "description":"Extract requests from a collection Js",
        "author":"luistejeda",
        "icon":"broom",
        "tags":"json,js,object,Postman",
        "bias": -0.1
    }
**/
const Hashes = require('@boop/hashes')


function getAllTransactions(collection, allRequests, state) {
  var SHA1 = new Hashes.SHA1;

  if ((collection && !collection.item) || (collection && !Array.isArray(collection.item))) {
    return;
  }
  collection.item.forEach((item) => {
    if ((item && item.request) || (item && item.response)) {
      item.id = SHA1.hex(item.name);
      allRequests.push(item);
    } else {
      getAllTransactions(item, allRequests, state);
    }
  });
}


function main(state) {
  try {
    const data = state.text;
    let allRequests = [];
    getAllTransactions(JSON.parse(data), allRequests, state);
    state.text = JSON.stringify(allRequests, null, 2);
  } catch (ex) {
    state.postError(ex.message);
  }
}
