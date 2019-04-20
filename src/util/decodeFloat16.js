'use strict';

function decodeFloat16(binary) {
  var exponent = (binary & 0x7c00) >> 10;
  var fraction = binary & 0x03ff;
  return (
    (binary >> 15 ? -1 : 1) *
    (exponent
      ? exponent === 0x1f
        ? fraction
          ? NaN
          : Infinity
        : Math.pow(2, exponent - 15) * (1 + fraction / 0x400)
      : 6.103515625e-5 * (fraction / 0x400))
  );
}

module.exports = decodeFloat16;

/*
function test() {
  var samples = [
    0x3c00, // = 1
    0xc000, // = −2
    0x7bff, // = 6.5504 × 10^4 (max half precision)
    0x0400, // = 2^−14 ≈ 6.10352 × 10^−5 (minimum positive normal)
    0x0001, // = 2^−24 ≈ 5.96046 × 10^−8 (minimum strictly positive subnormal)
    0x0000, // = 0
    0x8000, // = −0
    0x7c00, // = Infinity
    0xfc00, // = −Infinity
    0x3555, // ≈ 0.33325... ≈ 1/3
    0x7c01 // = NaN
  ];
  var i = samples.length;
  while (i--) samples[i] = decodeFloat16(samples[i]);
  return samples.join('\n');
}
*/
