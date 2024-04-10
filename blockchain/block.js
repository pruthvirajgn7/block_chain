const ChainUtil = require('../chain-util')
const { DIFFICULTY, MINE_RATE } = require('../config')

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    // used for debugging
    // we print only first 10 characters of hash which is 32 characters
    toString() {
        return `Block -
            Timestamp  : ${this.timestamp}
            Last Hash  : ${this.lastHash.substring(0,10)}  
            Hash       : ${this.hash.substring(0,10)}
            Nonce      : ${this.nonce}
            Difficulty : ${this.difficulty}
            Data       : ${this.data}
        `;
    }

    // This will create genesis block with arbitrary predefined hash 
    // This function is static beacuse, this is the first block
    static genesis() {   
        return new this('Genesis time', '----', 'abcde-1234',[], 0)  //return a new block 
    }

    //This function is static because miner is still mining the block, so miner do not want
    //to create an instance of block for mining 
    static mineBlock(lastBlock, data){
        let timestamp, hash;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
        

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data,nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    // This function is used to generate block's hash for blockchain validation purpose
    static blockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty-1;
        return difficulty;
    }
}

module.exports = Block;