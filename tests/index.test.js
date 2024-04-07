const Blockchain = require('../blockchain/index');
const Block = require('../blockchain/block');

describe('Blockchain', () => {
    let bc,bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    })

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    })

    it('adds a new block', () => {
        const data = 'CS-581';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('valides a valid chain', ()=> {
        bc.addBlock('CS-581');
        
        expect(bc.isValidChain(bc.chain)).toBe(true);
    })

    it('invalidates a chain with a corrupt genesis block', () => {
        bc.chain[0].data = 'Bad data';

        expect(bc.isValidChain(bc.chain)).toBe(false);
    })

    it('invalidates a corupt chain', () => {
        bc.addBlock('CS-581');
        bc.chain[1].data = 'Bad data'

        expect(bc.isValidChain(bc.chain)).toBe(false);
    })

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock('CS-581');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    })

    it('it does nt replace the chain with one of less than or equal to length', () => {
        bc.addBlock('CS-581');
        bc.replaceChain(bc2);

        expect(bc.chain).not.toEqual(bc2.chain);
    })
});