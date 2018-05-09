import * as steem from "steem";
import * as bluebird from "bluebird";
import {ExtensionServer} from "./ExtensionServer";
import {PrivateDataManager} from "./PrivateDataManager";

let s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/steemSecureSteemJsInterface.js');
(document.head || document.documentElement).appendChild(s);


const extensionServer = new ExtensionServer();

extensionServer.on(
  "steem.api.setOptions", function (params, eResponse) {
    steem.api.setOptions(params.options);
      eResponse.send({});
  }
);

extensionServer.on(
  "steem.config.set", function (params, eResponse) {
    steem.config.set(params.property, params.value);
    eResponse.send({});
  }
);

extensionServer.on(
  "steem.config.get", function (params, eResponse) {
    let value = steem.config.get(params.property);
    eResponse.send({value: value});
  }
);

extensionServer.on(
  "steem.api.getTrendingTags", function (params, eResponse) {
    steem.api.getTrendingTags(params.afterTag, params.limit, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByTrending", function (params, eResponse) {
    steem.api.getDiscussionsByTrending(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByCreated", function (params, eResponse) {
    steem.api.getDiscussionsByCreated(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByActive", function (params, eResponse) {
    steem.api.getDiscussionsByActive(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByCashout", function (params, eResponse) {
    steem.api.getDiscussionsByCashout(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByPayout", function (params, eResponse) {
    steem.api.getDiscussionsByPayout(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByVotes", function (params, eResponse) {
    steem.api.getDiscussionsByVotes(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByChildren", function (params, eResponse) {
    steem.api.getDiscussionsByChildren(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByHot", function (params, eResponse) {
    steem.api.getDiscussionsByHot(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByFeed", function (params, eResponse) {
    steem.api.getDiscussionsByFeed(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByBlog", function (params, eResponse) {
    steem.api.getDiscussionsByBlog(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getDiscussionsByComments", function (params, eResponse) {
    steem.api.getDiscussionsByComments(params.query, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getBlockHeader", function (params, eResponse) {
    steem.api.getBlockHeader(params.blockNum, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getBlock", function (params, eResponse) {
    steem.api.getBlock(params.blockNum, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getState", function (params, eResponse) {
    steem.api.getState(params.path, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getTrendingCategories", function (params, eResponse) {
    steem.api.getTrendingCategories(params.after, params.limit, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getBestCategories", function (params, eResponse) {
    steem.api.getBestCategories(params.after, params.limit, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getActiveCategories", function (params, eResponse) {
    steem.api.getActiveCategories(params.after, params.limit, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getRecentCategories", function (params, eResponse) {
    steem.api.getRecentCategories(params.after, params.limit, function(err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.api.getAccounts", function (params, eResponse) {
    steem.api.getAccounts(params.accounts, function (err, res) {
      eResponse.send(res, err);
    });
  }
);

extensionServer.on(
  "steem.broadcast.prepareAndSignTransferTransaction", function (params, eResponse) {
    PrivateDataManager.getActiveCredentials(function (steemAccountName, activeWif) {
      let tx = {
        extensions: [],
        operations: [
          ["transfer", {
            amount: params.amount,
            from: steemAccountName,
            to: params.to,
            memo: params.memo
          }]
        ]
      };
      steem.broadcast._prepareTransaction(tx).then(function (params) {
        return bluebird.join(transaction, steem.auth.signTransaction(params.transaction, {active: activeWif}));
      }).spread(function (transaction, signedTransaction) {
        eResponse.send(signedTransaction);
      });
    });
  }
);

extensionServer.on(
  "steem.broadcast.broadcastSignedTransaction", function (params, eResponse) {
    steem.api.broadcastTransactionSynchronousAsync(params.signedTransaction).then(function (result) {
      eResponse.send(result);
    });
  }
);

extensionServer.on(
  "steem.broadcast.transfer", function (params, eResponse) {
    PrivateDataManager.getActiveCredentials(function (steemAccountName, activeWif) {
      steem.broadcast.transfer(activeWif, steemAccountName, params.to, params.amount, params.memo, function (err, res) {
        eResponse.send(res, err);
      });
    })
  }
);