const healthChannel = (req, res) => {
  res.json({ status: 'OK', service: 'MangoDesk Backend', timestamp: new Date().toISOString() });
};

module.exports = healthChannel;
