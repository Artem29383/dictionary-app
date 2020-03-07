const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  return config;
};

module.exports = optimize;