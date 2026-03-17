module.exports = function (api: any) {
  api.cache(true);

  const presets = ["@babel/preset-env", "@babel/preset-flow"];
  const plugins: any[] = [];

  return {
    presets,
    plugins,
  };
};
