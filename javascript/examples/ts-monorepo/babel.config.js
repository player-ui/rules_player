module.exports = (api) => ({
  presets: [
    ['@babel/preset-env', { modules: api.env('module') ? false : 'auto' }],
    require.resolve('@babel/preset-typescript'),
  ]
})