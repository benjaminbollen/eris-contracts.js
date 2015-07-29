var chai = require('chai');
var assert = chai.assert;
var coder = require('../lib/solidity/coder');
var BigNumber = require('bignumber.js');

function bn(val, enc) {
    return new BigNumber(val, enc);
}

describe('lib/solidity/coder', function () {
    describe('encodeParam', function () {
        var test = function (t) {
            it('should turn ' + t.value + ' to ' + t.expected, function () {
                assert.equal(coder.encodeParam(t.type, t.value), t.expected);
            });
        };

        test({ type: 'int', value: 1,               expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int', value: 16,              expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int', value: -1,              expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ type: 'int', value: 0.1,             expected: '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'int', value: 3.9,             expected: '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int256', value: 1,            expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int256', value: 16,           expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int256', value: -1,           expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ type: 'bytes32', value: '0x6761766f66796f726b',
            expected: '00000000000000000000000000000000000000000000006761766f66796f726b'});
        test({ type: 'bytes32', value: bn('0x6761766f66796f726b'),
            expected: '00000000000000000000000000000000000000000000006761766f66796f726b'});
        test({ type: 'bytes32', value: 12,
            expected: '000000000000000000000000000000000000000000000000000000000000000c'});
        test({ type: 'bytes32', value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes32', value: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes32', value: '0x02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29',
            expected: '02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29'});
        test({ type: 'bytes', value: '0x6761766f66796f726b',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '00000000000000000000000000000000000000000000006761766f66796f726b'});
        test({ type: 'bytes', value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000020' +
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'string', value: 'gavofyork',  expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000009' +
        '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ type: 'bytes', value: '0xc3a40000c3a4',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            '0000000000000000000000000000000000000000000000000000c3a40000c3a4'});
        test({ type: 'bytes32', value: '0xc3a40000c3a4',
            expected: '0000000000000000000000000000000000000000000000000000c3a40000c3a4'});
        test({ type: 'string', value: '\xc3\xa4\x00\x00\xc3\xa4',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        test({ type: 'string', value: '\xc3',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            'c300000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'int[]', value: [],            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'int[]', value: [3],           expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int256[]', value: [3],        expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int[]', value: [1,2,3],       expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000003' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000002' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'bool', value: true,           expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'bool', value: false,          expected: '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'address', value: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
            expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'});
        test({ type: 'address', value: '407d73d8a49eeb85d32cf465507dd71d507100c1',
            expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'});
        test({ type: 'real', value: 1,              expected: '0000000000000000000000000000000100000000000000000000000000000000'});
        test({ type: 'real', value: 2.125,          expected: '0000000000000000000000000000000220000000000000000000000000000000'});
        test({ type: 'real', value: 8.5,            expected: '0000000000000000000000000000000880000000000000000000000000000000'});
        test({ type: 'real', value: -1,             expected: 'ffffffffffffffffffffffffffffffff00000000000000000000000000000000'});
        test({ type: 'ureal', value: 1,             expected: '0000000000000000000000000000000100000000000000000000000000000000'});
        test({ type: 'ureal', value: 2.125,         expected: '0000000000000000000000000000000220000000000000000000000000000000'});
        test({ type: 'ureal', value: 8.5,           expected: '0000000000000000000000000000000880000000000000000000000000000000'});
        test({ type: 'bytes', value: '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes', value: '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000060' +
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'string', value: 'welcome to ethereum. welcome to ethereum. welcome to ethereum.',
            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
            '000000000000000000000000000000000000000000000000000000000000003e' +
            '77656c636f6d6520746f20657468657265756d2e2077656c636f6d6520746f20' +
            '657468657265756d2e2077656c636f6d6520746f20657468657265756d2e0000'});
    });
});

describe('lib/solidity/coder', function () {
    describe('encodeParams', function () {
        var test = function (t) {
            it('should turn ' + t.values + ' to ' + t.expected, function () {
                assert.equal(coder.encodeParams(t.types, t.values), t.expected);
            });
        };


        test({ types: ['int'], values: [1],                 expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['int'], values: [16],                expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ types: ['int'], values: [-1],                expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ types: ['int256'], values: [1],              expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['int256'], values: [16],             expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ types: ['int256'], values: [-1],             expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ types: ['bytes32'], values: ['0x6761766f66796f726b'],
            expected: '00000000000000000000000000000000000000000000006761766f66796f726b'});
        test({ types: ['string'], values: ['gavofyork'],    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000009' +
        '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ types: ['int[]'], values: [[3]],             expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ types: ['int256[]'], values: [[3]],          expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ types: ['int256[]'], values: [[1,2,3]],      expected: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000003' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000002' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ types: ['int[]', 'int[]'], values: [[1,2], [3,4]],
            expected: '0000000000000000000000000000000000000000000000000000000000000040' +
            '00000000000000000000000000000000000000000000000000000000000000a0' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000004'});
        test({ types: ['bytes32', 'int'], values: ['0x6761766f66796f726b', 5],
            expected: '00000000000000000000000000000000000000000000006761766f66796f726b' +
            '0000000000000000000000000000000000000000000000000000000000000005'});
        test({ types: ['int', 'bytes32'], values: [5, '0x6761766f66796f726b'],
            expected: '0000000000000000000000000000000000000000000000000000000000000005' +
            '00000000000000000000000000000000000000000000006761766f66796f726b'});
        test({ types: ['string', 'int'], values: ['gavofyork', 5],
            expected: '0000000000000000000000000000000000000000000000000000000000000040' +
            '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ types: ['string', 'bool', 'int[]'], values: ['gavofyork', true, [1, 2, 3]],
            expected: '0000000000000000000000000000000000000000000000000000000000000060' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            '00000000000000000000000000000000000000000000000000000000000000a0' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ types: ['string', 'int[]'], values: ['gavofyork', [1, 2, 3]],
            expected: '0000000000000000000000000000000000000000000000000000000000000040' +
            '0000000000000000000000000000000000000000000000000000000000000080' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ types: ['int', 'string'], values: [5, 'gavofyork'],
            expected: '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ types: ['int', 'string', 'int', 'int', 'int', 'int[]'], values: [1, 'gavofyork', 2, 3, 4, [5, 6, 7]],
            expected: '0000000000000000000000000000000000000000000000000000000000000001' +
            '00000000000000000000000000000000000000000000000000000000000000c0' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000004' +
            '0000000000000000000000000000000000000000000000000000000000000100' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            '0000000000000000000000000000000000000000000000000000000000000007'});
        test({ types: ['int', 'bytes', 'int', 'bytes'], values: [
            5,
            '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            3,
            '0x331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ],
            expected: '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000080' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '00000000000000000000000000000000000000000000000000000000000000e0' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
    });
});

describe('lib/solidity/coder', function () {
    describe('encodeParams', function () {

        it("should detect non hex and throw", function(){
            assert.throws(function() {
                    coder.encodeParam('bytes32', "NotHex");
                },
                "Strings must be hex if the type is bytesX"
            );
        });

        it("should detect non hex and throw", function(){
            assert.throws(function() {
                    coder.encodeParam('bytes32', "0xStillNotHex");
                },
                "Strings must be hex if the type is bytesX"
            );
        })
    });
});