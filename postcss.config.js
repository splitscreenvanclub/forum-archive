module.exports = {
  plugins: [
    [
      'tailwindcss',
      {
        config: `./theme/ssvc.tailwind.config.js`,
      },
    ],
    'postcss-preset-env',
  ],
}
