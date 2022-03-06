// import module to be tested
const barrenLandAnalysis = require('../../modules/barrenLandAnalysis.js');

// tests
describe('testing barrenLandAnalysis', () => {
    describe( ' first given example from prompt `0 292 399 307`', () => {
        test( ' return `116800 116800` when passed first prompt', ( done ) => {
            const result = barrenLandAnalysis(['0 292 399 307']);
            expect( result ).toBe('116800 116800 ');
            done();
        })
    })
    describe( ' second given example from prompt [`48 192 351 207`, `48 392 351 407`, `120 52 135 547`, `260 52 275 547`]', () => {
        test( ' return `22816 192608 ` when second prompt', ( done ) => {
            const result = barrenLandAnalysis([`48 192 351 207`, `48 392 351 407`, `120 52 135 547`, `260 52 275 547`]);
            expect( result ).toBe(`22816 192608 `);
            done();
        })
    })
    describe( ' additional testing with new prompts', () => {
        test( ' return `239900 ` when given [`0 0 9 9`]', ( done ) => {
            const result = barrenLandAnalysis(['0 0 9 9']);
            expect( result ).toBe(`239900 `);
            done();
        })
    })
    describe( ' additional testing with new prompts', () => {
        test( ' return `2241 3141 96861 135761 ` when given [`0 0 0 599`, `0 0 399 0`, `10 0 10 599`, `0 250 399 250`]', ( done ) => {
            const result = barrenLandAnalysis([`0 0 0 599`, `0 0 399 0`, `10 0 10 599`, `0 250 399 250`]);
            expect( result ).toBe(`2241 3141 96861 135761 `);
            done();
        })
    })
    describe( ' no fertile land available', () => {
        test( ' return `No fertile land.` if no land available', ( done ) => {
            const result = barrenLandAnalysis(['0 0 399 599']);
            expect( result ).toBe('No fertile land.');
            done();
        })
    })
})
