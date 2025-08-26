const healthChannel = (req, res) => {
  res.json({ status: 'OK', service: 'AppleDesk Backend', timestamp: new Date().toISOString() });
};

module.exports = healthChannel;
