const SHA256 = require('crypto-js/sha256');
    
class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // used for debugging
    // we print only first 10 characters of hash which is 32 characters
    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0,10)}  
            Hash     : ${this.hash.substring(0,10)}
            Data     : ${this.data}
        `;
    }

    // This will create genesis block with arbitrary predefined hash 
    // This function is static beacuse, this is the first block
    static genesis() {   
        return new this('Genesis time', '----', 'abcde-1234',[])  //return a new block 
    }

    //This function is static because miner is still mining the block, so miner do not want
    //to create an instance of block for mining 
    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;