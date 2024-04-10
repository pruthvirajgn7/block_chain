const EC = require('elliptic').ec;  // to use elliptic cryptography to generate key-pair for a wallet
const {v1: uuidV1} = require('uuid');
const ec = new EC('secp256k1');     // 256 bits prime number will be used to generate 
const SHA256 = require('crypto-js/sha256');

class ChainUtil {
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;