const testCandidate = require('./programmer'),
    expect = require("chai").expect;

describe('lib/programmer --- ', () => {

    beforeEach(() => {
        expect(testCandidate).not.to.be.null;
        expect(testCandidate.commander).not.to.be.null;
        expect(testCandidate.exit).not.to.be.null;
        expect(testCandidate.exited).to.be.false;
    });

    it('should test exit', () => {
        expect(testCandidate.exited).not.to.be.true;
        expect(testCandidate.exited).to.be.false;
        testCandidate.exit(0);
        expect(testCandidate.exited).to.be.true;
    });
});