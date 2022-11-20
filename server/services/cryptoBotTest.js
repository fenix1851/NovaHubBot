require('dotenv').config();
const {
    CRYPTO_BOT_TOKEN,
    CRYPTO_TEST_TOKEN
} = process.env;
const {
    CryptoPay,
    Assets,
    PaidButtonNames
} = require('@foile/crypto-pay-api');

const cryptoPay = new CryptoPay(CRYPTO_TEST_TOKEN, {
    hostname: 'testnet-pay.crypt.bot',
    protocol: 'https'
});
(async () => {
    const app = await cryptoPay.getMe();
    console.log(app);
    console.log('---------------------');
    console.log(await cryptoPay.createInvoice(Assets.USDT, 1,{
        description: 'Test invoice',
        paid_btn_name: PaidButtonNames.PAY,
        payload: '{"chat_id": "123456"}'
    }))
    // console.log(await cryptoPay.getInvoices());
    // cryptoPay.on('invoice_paid', update => console.log(update.payload));
})()