jayson = require('jayson');
//var yamlConfig = require('node-yaml-config');
//var config = yamlConfig.load('../../../config/config.yml');
//var rpcConfig = jayson.client.http(rpcConfig);

var client = jayson.client.http({
   port: 4040,
   hostname: 'localhost'
   });

//test
function add(a, b, callback) {
   client.request('add', [a, b], function(err, error, response) {
      if(err) throw err;
      console.log(response);
      callback(response);
      
      }); 
 }
// Get news summaries for a user
function getNewsSummariesForUser(user_id, page_num, callback) {
    client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
        if (err) throw err;
        console.log(response);
        callback(response);
    });
}

function logNewsClickForUser(user_id, news_id) {
    click.request('logNewsClickForUser', [user_id,news_id], function (err, error, response) {
        if(err) throw err;
        console.log(response);
    })
}

 module.exports = {
     add : add,
     getNewsSummariesForUser : getNewsSummariesForUser,
     logNewsClickForUser : logNewsClickForUser
 }
