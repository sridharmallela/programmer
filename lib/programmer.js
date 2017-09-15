var com = require('commander'),
    _exit = process.exit;

/* istanbul ignore next */
// AOP around for commander to option missing argument
around(com, 'optionMissingArgument', function(fn, args) {
    com.outputHelp();
    fn.apply(this, args);
    return {
        args: [],
        unknown: []
    }
});

/* istanbul ignore next */
// AOP before for commander to output help
before(com, 'outputHelp', function() {
    // track if help was shown for unknown option
    this._helpShown = true;
});

/* istanbul ignore next */
// AOP before for commander to unknown option
before(com, 'unknownOption', function() {
    // allow unknown options if help was shown, to prevent trailing error
    this._allowUnknownOption = this._helpShown;

    // show help if not yet shown
    if (!this._helpShown) {
        com.outputHelp();
    }
});

// utility functions
/* istanbul ignore next */
function around(obj, method, fn) {

    var old = obj[method];

    obj[method] = function() {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        return fn.call(this, old, args);
    }
}

/* istanbul ignore next */
function before(obj, method, fn) {

    var old = obj[method];

    obj[method] = function() {
        fn.call(this);
        old.apply(this, arguments);
    }
}

// main code here
function Programmer() {
    this.commander = com;
    this.exited = false;
}

/**
 * Graceful exit for async STDIO
 */
Programmer.prototype.exit = function(code) {

    function done() {
        if (!(draining--)) {
            _exit(code);
        }
    }

    var draining = 0,
        streams = [process.stdout, process.stderr];

    this.exited = true;

    streams.forEach(function(stream) {
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    });

    done();
}

exports = module.exports = new Programmer();