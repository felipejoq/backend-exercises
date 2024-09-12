import {describe, test} from 'node:test';
import assert from 'node:assert/strict';
import {getDayNumberCurrentYear} from "../index.js";

describe('index', () => {
    // Set date with format MM-DD-YYYY
    test('should return 256', () => {
        const result = getDayNumberCurrentYear(new Date('09-12-2024'));
        assert.strictEqual(result, 256);
    });

    test('should return One', () => {
        const result = getDayNumberCurrentYear(new Date('01-01-2024'));
        assert.strictEqual(result, 1);
    });
});