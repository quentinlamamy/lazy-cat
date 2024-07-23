import assert from 'assert';
import { suite, test } from 'node:test';
import Utils from '../lib/utils.js';

suite('Required Arguments', () => {

    test('Is present', () => {

        let argv = null

        try {
            argv = Utils.processArgv(["node", "app.js", "filter", "dog", "count"],["filter"],true);
        } catch (error) {return false}
    
        return true

    })

    test('Just missing', () => {

        let argv = null
    
        try {
            argv = Utils.processArgv(["node", "app.js", "dog", "count"],["filter"],true);
        } catch (error) {

            assert.strictEqual(error.code, "MISSING_ARGS")
        }
    
    })

    test('Not enough arguments', () => {

        let argv = null
    
        try {
            argv = Utils.processArgv(["node", "app.js", "count"],["foo","bar","riri","fifi","loulou"],true);
        } catch (error) {

            assert.strictEqual(error.code, "MISSING_ARGS")
        }
    
    })

})

suite("Optional Arguments", () => {

    test("No additional arguments limitation", () => {

        let argv = null

        try {
            argv = Utils.processArgv(["node", "app.js", "filter", "dog", "count"],["filter"],true);
        } catch (error) {return false}
    
        return true

    })

    test("Give too much argument", () => {

        let argv = null

        try {
            argv = Utils.processArgv(["node", "app.js", "filter", "dog", "count"],["filter"],false);
        } catch (error) {
            assert.strictEqual(error.code, "TOO_MUCH_ARGS")
        }
    
    })

    test("Give good number of arguments (but missing)", () => {

        let argv = null

        try {
            argv = Utils.processArgv(["count"],["filter"],false);
        } catch (error) {
            assert.strictEqual(error.code, "MISSING_ARGS")
        }
    
    })

})

