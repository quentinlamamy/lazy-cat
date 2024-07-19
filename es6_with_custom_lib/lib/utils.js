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
 * @property {String} foo - A test member.
 * @author Juan Carlos Arcila
 */
class Utils {

    /**
     * Return an object with the arguments from the command line.
     * @static
     * @param {String[]} expectedArgs - An array of expected arguments.
     * @param {Boolean} [canBeMore=false] - If true, then the number of arguments can be more than expected
     * @returns {ArgvObject} - An object with each argument
     * @example Utils.getArgv(["-f", "-o"], true);
     */
    static getArgv(expectedArgs = [], canBeMore = false) {

        // Create an object to store the arguments.
        let argvObject = {};

        // Spread a set of the expected arguments to remove duplicates in an array to deduplicate it.
        expectedArgs = [...new Set(expectedArgs)];

        // Get the arguments from the command line.
        const args = process.argv.slice(2);

        // If there are fewer arguments than expected, then exit.
        if (args.length < expectedArgs.length) throw new Error("Missing Arguments");

        // If there are more arguments than expected, then exit.
        if (!canBeMore && expectedArgs.length !== 0 && args.length > expectedArgs.length) throw new Error("Unexpected additional arguments");

        for (const arg of args) {

            const [key, value] = arg.split("=");
            const cleanKey = key.replaceAll("-","");

            argvObject[cleanKey] = {
                type: value === undefined ? "flag" : "argv",
                short: key.indexOf("-") === key.lastIndexOf("-") ? true : false,
            }

            if (value !== undefined) argvObject[cleanKey].value = value;

        }

        // Check if the expected arguments are in the command line arguments.
        const allArgsPresent = expectedArgs.every(arg => argvObject.hasOwnProperty(arg));

        if (!allArgsPresent) {
            const missingArgs = expectedArgs.filter(arg => !argvObject.hasOwnProperty(arg));
            throw new Error(`Missing argument(s): ${missingArgs.join(", ")}`);
        }


        return argvObject;
    }
}

export default Utils;
