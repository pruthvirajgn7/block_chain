const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Transaction = '../wallet/transaction.js'

describe('Wallet', () => {
    let wallet, tp;

    beforeEach(() => {
        wallet = new Wallet();
        console.log(wallet)
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'random-address';
            transaction = wallet.createTransaction(recipient, sendAmount, tp);
            console.log(wallet)
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, tp);
            })

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount*2);
            })

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                  .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            })
        })
    })
})