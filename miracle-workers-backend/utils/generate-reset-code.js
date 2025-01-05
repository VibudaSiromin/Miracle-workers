const generateResetCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

exports.generateResetCode = generateResetCode;
