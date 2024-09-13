const formatCurrency = (value, fractionDigits = 2) => {
  const usdCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return usdCurrencyFormat.format(value / 100);
};

export default formatCurrency;
