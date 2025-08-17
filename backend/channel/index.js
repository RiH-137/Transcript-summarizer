// Channel modules index
// This file exports all channel modules for easier importing

module.exports = {
  healthChannel: require('./healthChannel'),
  uploadChannel: require('./uploadChannel'),
  summarizeChannel: require('./summarizeChannel'),
  sentimentChannel: require('./sentimentChannel'),
  translateChannel: require('./translateChannel'),
  highlightsChannel: require('./highlightsChannel'),
  keyPointsChannel: require('./keyPointsChannel'),
  emailChannels: require('./emailChannels'),
  exportChannel: require('./exportChannel'),
  chatChannel: require('./chatChannel')
};
