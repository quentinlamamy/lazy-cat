/**
 * @typedef {Object} ArgvObject
 * @property {string} key - The key of the argument (e.g., "f").
 * @property {string} type - The type of the argument (argv or flag).
 * @property {boolean} [short] - is short argument (e.g., true).
 * @property {string} [value] - The value of the argument - not present if it is a flag.
 */


/**
 * @class Utils
 * @classdesc This class contains utility functions.
 */
class Utils {

    /**
     * Return argument list and check if they follow the expected arguments rules
     * @static
     * @param {String[]} expectedArgs - An array of expected arguments
     * @param {Boolean} canBeMore - If true, then the number of arguments can be more than expected
     * @returns {ArgvObject} - An object with each argument
     * @example Utils.getArgv(["count","f"], true);
     */
    static getArgv(expectedArgs = [], canBeMore = false) {

        // Get the arguments from the command line.
        const argv = process.argv.slice(2);

        return Utils.processArgv(argv, expectedArgs, canBeMore);

    }

    /**
     * Return an object with the arguments from the command line and check if they follow the expected arguments rules.
     * @static
     * @param {String[]} argv - An array of arguments.
     * @param {String[]} expectedArgv - An array of expected arguments.
     * @param {Boolean} [canBeMore=false] - If true, then the number of arguments can be more than expected
     * @returns {ArgvObject} - An object with each argument
     * @example Utils.processArgv(["foo","count","f"],["count","f"], true);
     */
    static processArgv(argv, expectedArgv = [], canBeMore = false) {

        // Create an object to store the arguments.
        let argvObject = {};

        // Spread a set of the expected arguments to remove duplicates in an array to deduplicate it.
        expectedArgv = [...new Set(expectedArgv)];

        // If there are fewer arguments than expected, then exit.
        if (argv.length < expectedArgv.length) Utils.throwError("MISSING_ARGS","Missing argument(s)");

        // If there are more arguments than expected, then exit.
        if (!canBeMore && expectedArgv.length !== 0 && argv.length > expectedArgv.length) Utils.throwError("TOO_MUCH_ARGS","Missing argument(s)")

        for (const arg of argv) {

            const [key, value] = arg.split("=");
            const cleanKey = key.replaceAll("-", "");

            argvObject[cleanKey] = {
                type: value === undefined ? "flag" : "argv",
                short: key.indexOf("-") === key.lastIndexOf("-") ? true : false,
            }

            if (value !== undefined) argvObject[cleanKey].value = value;

        }

        // Check if the expected arguments are in the command line arguments.
        const allArgsPresent = expectedArgv.every(arg => argvObject.hasOwnProperty(arg));

        // TODO: check if it's the right type, argv or flag
        if (!allArgsPresent) {
            const missingArgs = expectedArgv.filter(arg => !argvObject.hasOwnProperty(arg));
            Utils.throwError("MISSING_ARGS",`Missing argument(s): ${missingArgs.join(", ")}`);
        }

        return argvObject;
    }

    /**
     * Throw an error with a code and message.
     * @static
     * @param {String} code - The error code.
     * @param {String} message - The error message.
     * @throws {Error} - An error with the code and message.
     * @example Utils.throwError("MISSING_ARGS","Missing argument(s)");
     */
    static throwError(code,message) {
        let newError = new Error(message);
        newError.code = code;
        throw newError;
    }

}

export default Utils;