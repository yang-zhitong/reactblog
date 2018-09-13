module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    'consistent-return': 'off', // 必须明确的return
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
  }
};
