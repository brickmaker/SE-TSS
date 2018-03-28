export const TEST_ADD_VAL = 'test_add_val';

export function testAction(value) {
    return {
        type: TEST_ADD_VAL,
        value: value
    }
}