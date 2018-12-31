module.exports = {
  // presets: ["@vue/app"]

  presets: [
    [
      "@babel/preset-env",
      {
        "modules": true
      }
      // "es2015",
      // "stage-0"
    ]
  ],

  // // "presets": [
  // //   [
  // //     "es2015",
  // //     {
  // //       "modules": false
  // //     }
  // //   ],
  // // ],
  // // "env": {
  // //   "start": {
  // //     "presets": [
  // //       "react-hmre"
  // //     ]
  // //   },
  // //   "test": {
  // //     "presets": ["es2015", "react", "stage-0"]
  // //   }
  // // }

  // // "presets": [
  // //   ["env", { "modules": false }]
  // // ],
  // env: {
  //   test: {
  //     presets: [
  //       ["env", { "targets": { "node": "current" } }],
  //       "es2015",
  //       "stage-0"
  //     ]
  //   }
  // }

  // "presets": [
  //   ["env", {
  //     "modules": false,
  //     "targets": {
  //       "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
  //     }
  //   }],
  //   "stage-2"
  // ],
  // "plugins": ["transform-vue-jsx", "transform-runtime"],
  // "env": {
  //   "test": {
  //     "presets": ["env", "stage-2"],
  //     "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
  //   }
  // }

  // "presets": [
  //   "es2015",
  //   "stage-0",
  //   { "modules": false }
  // ],
  // "env": {
  //   "test": {
  //     "plugins": [
  //       "transform-es2015-modules-commonjs"
  //     ]
  //   }
  // }
};
