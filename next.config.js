/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  webpack: (config, { webpack }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    };
    config.module.rules.push({
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
      },
    });
    // config.externals["node:fs"] = "commonjs node:fs";
    // config.plugins.push(
    //   // Remove node: from import specifiers, because Next.js does not yet support node: scheme
    //   // https://github.com/vercel/next.js/issues/28774
    //   new webpack.NormalModuleReplacementPlugin(
    //     /^node:/,
    //     (resource) => {
    //       resource.request = resource.request.replace(/^node:/, '');
    //     },
    //   ),
    // );
    // config.resolve.fallback = {
    //   ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
    //   // by next.js will be dropped. Doesn't make much sense, but how it is
    //   fs: false, // the solution
    // };
    return config;
  }
}
// const nextConfig = {
//   /* config options here */
//   experiments: {
//     asyncWebAssembly: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.wasm$/,
//         type: 'webassembly/async',
//       },
//     ],
//   }
// }

module.exports = nextConfig
// module.exports = {
//   // config,
//   // css: [
//   //   'tailwindcss',
//   //   'postcss-flexbugs-fixes',
//   //   'postcss-preset-env',
//   // ],
//   experiments: {
//     asyncWebAssembly: true,
//   },
//   // module: {
//   //   rules: [
//   //     {
//   //       test: /\.wasm$/,
//   //       type: 'webassembly/async',
//   //     },
//   //   ],
//   // },
// }
