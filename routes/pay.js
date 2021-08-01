var express = require('express');
var router = express.Router();
const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6ImNvcXZwYy0wMCIsInVzZXJfaWQiOiI3OTc3MDYxNjk0NSIsInNlY3JldCI6ImI2MDZkYzdlMTA1OWE3OGVmODkzMDUxMzZkOGE2OTkxMjhmYmNhNTFlYzhjODliNzY3YTFiYWJlOTk2MDM0N2EifX0=';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
const billId = qiwiApi.generateId();

router.get("/qiwi", (req,res) =>{
    const publicKey = '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPq14djyKhYLipKz1mVa3wNz5mKLEtz59iVpLP2F4hm6CHo19xZREYq8ft1qMioqCawgzubvKTfBL39BVRm2SVCXcBZraYvbbRjVXiZZEw2';
    const params = {
        publicKey,
        amount: 9,
        billId,
        successUrl: 'http://localhost:3000',
        comment:"Премиум на 2 сервера NELODA"
    };
    res.redirect(qiwiApi.createPaymentForm(params))
});


module.exports = router;