'use strict';

const testCandidate = require('./programmer');

describe('lib/programmer --- ', () => {
  beforeEach(() => {
    expect(testCandidate).toBeDefined();
    expect(testCandidate.commander).toBeDefined();
    expect(testCandidate.exit).toBeDefined();
    expect(testCandidate.exited).toEqual(false);
  });

  test('should test copyrights', () => {
    const year = String(new Date().getUTCFullYear());
    expect(testCandidate.copyrights()).toEqual('  Copyright (c) ' + year + ' ');
    expect(testCandidate.copyrights('TEST_COPYRIGHTS')).toEqual(
      '  Copyright (c) ' + year + ' TEST_COPYRIGHTS'
    );
  });

  test('should test promptMessage', () => {
    const platform = process.platform;
    if (platform !== 'win32') {
      expect(testCandidate.promptMessage()).toContain('    $ ');
      expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).toEqual(
        '    $ TEST_PROMPT_MESSAGE'
      );
      Object.defineProperty(process, 'platform', { value: 'win32' });
      expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).toEqual(
        '    $ TEST_PROMPT_MESSAGE'
      );
      const env = process.env._;
      Object.defineProperty(process, 'env', { value: {} });
      expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).toEqual(
        '    > TEST_PROMPT_MESSAGE'
      );
      Object.defineProperty(process, 'env', { value: env });
    } else {
      expect(testCandidate.promptMessage()).toContain('    > ');
      expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).toEqual(
        '    > TEST_PROMPT_MESSAGE'
      );
      Object.defineProperty(process, 'platform', { value: 'darwin' });
      expect(testCandidate.promptMessage('TEST_PROMPT_MESSAGE')).toEqual(
        '    $ TEST_PROMPT_MESSAGE'
      );
    }
    Object.defineProperty(process, 'platform', { value: platform });
  });

  test('should test runCommand', done => {
    testCandidate.runCommand(
      'lib/test-script',
      ['--version'],
      (code, out, err) => {
        expect(code).toEqual(null);
        expect(out).toEqual('testing process only\n');
        expect(err).toEqual('error occurred processing your request\n');
        done();
      }
    );
  });

  test('should test exit', () => {
    const exit = process.exit;
    Object.defineProperty(process, 'exit', {
      value: code => {
        expect(code).toEqual(0);
      }
    });
    expect(testCandidate.exited).toEqual(false);
    testCandidate.exit(0);
    Object.defineProperty(process, 'exit', {
      value: exit
    });
  });
});
