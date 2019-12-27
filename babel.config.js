const isEsm = process.env.TARGET === 'esm';

module.exports = (api) => {
  const isTest = api.env('test');

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: isEsm ? false : 'commonjs',
        targets: isEsm ? { esmodules: true } : { node: 'current' },
        shippedProposals: true,
      },
    ],
    '@babel/preset-typescript',
  ];

  if (isTest) {
    presets.push(['@babel/preset-react', { development: true }]);
  }

  return {
    presets,
    plugins: ['@babel/plugin-proposal-optional-chaining'],
  };
};
