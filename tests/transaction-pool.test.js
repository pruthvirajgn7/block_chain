const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')
const Transaction = require('../wallet/transaction')

describe('TransactionPool', () => {
    let tp, wallet, transaction;

    beforeEach( () => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'randomAddress', 30);
        tp.updateOrAddTransaction(transaction);
    })

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    })

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'abcdefgh', 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
        .not.toEqual(oldTransaction);
    })
})