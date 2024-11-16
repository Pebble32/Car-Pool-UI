module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: 'querystring-es3' // Use the module name directly
  };
  return config;
};
