const testCandidate = require('./programmer'),
    expect = require("chai").expect;

describe('lib/programmer --- ', () => {

    beforeEach(() => {
        expect(testCandidate).not.to.be.null;
        expect(testCandidate.commander).not.to.be.null;
        expect(testCandidate.exit).not.to.be.null;
        expect(testCandidate.exited).to.be.false;
    });

    it('should test copyrights', () => {
        const year = String((new Date()).getUTCFullYear());
        expect(testCandidate.copyrights()).to.eql('  Copyright (c) ' + year + ' ');
        expect(testCandidate.copyrights('TEST_COPYRIGHTS')).to.eql('  Copyright (c) ' + year + ' TEST_COPYRIGHTS');
    });

    it('should test promptMessage', () => {
        expect(testCandidate.promptMessage()).to.contain('    $ ');
        expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).to.eql('    $ TEST_PROMPT_MESSAGE');
        const platform = process.platform;
        const env = process.env._;
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).to.eql('    $ TEST_PROMPT_MESSAGE');
        Object.defineProperty(process, 'env', {
            value: {}
        });
        expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).to.eql('    > TEST_PROMPT_MESSAGE');
        Object.defineProperty(process, 'platform', {
            value: platform
        });
        Object.defineProperty(process, 'env', {
            value: env
        });
    });

    it('should test exit', () => {
        const exit = process.exit;
        Object.defineProperty(process, 'exit', {
            value: (code) => {
                expect(code).to.be.eql(0);
            }
        });
        expect(testCandidate.exited).to.be.false;
        testCandidate.exit(0);
        Object.defineProperty(process, 'exit', {
            value: exit
        });
    });
});