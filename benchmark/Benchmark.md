## Benchmark test of @fav/arith.subtract

> Comparing with [fraction.js](https://www.npmjs.com/package/fraction.js)

### v0.1.1

|            | @fav/arith.subtract(0.1.1) | fraction.js(4.0.10) |
|:-----------|---------------------------:|--------------------:|
| Zeros      |         20,881,956 ops/sec |  11,107,756 ops/sec |
| Integers   |         20,579,701 ops/sec |  12,178,997 ops/sec |
| Decimals   |         17,036,199 ops/sec |  12,050,356 ops/sec |
| Fractions  |         17,432,206 ops/sec |  12,284,396 ops/sec |
| Fractions  |         11,096,074 ops/sec |  11,994,883 ops/sec |
| BigNumbers |          4,459,323 ops/sec |  11,801,394 ops/sec |

- Platform: Node.js 10.8.0 on Darwin 64-bit
- Machine: Intel(R) Core(TM) i7-2620M CPU @ 2.70GHz, 16GB

