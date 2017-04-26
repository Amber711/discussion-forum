var express = require('express');
var router = express.Router();
var rpc_client = require('../rpc_client/rpc_client');
/* Get news list.*/
module.exports = router;

router.get('/userId/:userId/pageNum/:pageNum', function (req, res) {
   console.log('fetching news routes.js: ') ;
    let user_id = req.params['userId'];
    let page_num = req.params['pageNum'];

    rpc_client.getNewsSummariesForUser(user_id, page_num, function(response){
        res.json(response)
    })


});

module.exports = router