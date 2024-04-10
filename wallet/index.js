const ChainUtil = require('../chain-util')
const { INITIAL_BALANCE } = require('../config.js')

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();   // keypair object for each wallet
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
            publicKey : ${this.publicKey.toString()}
            balance   : ${this.balance}
        `
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
}

module.exports = Wallet;