module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  plugins: ['prettier'],
  rules: {
    // your rules
    'prettier/prettier': 'error', // 将prettier报错以eslint的形式报出来
  },
};
