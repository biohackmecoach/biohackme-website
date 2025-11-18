const { addToMailchimp } = require('./addToMailchimp')
const { subscribeToNewsletter } = require('./subscribeToNewsletter')
const { subscribeToMasterclass, completeAssessment } = require('./lib/mailchimp')

exports.addToMailchimp = addToMailchimp
exports.subscribeToNewsletter = subscribeToNewsletter
exports.subscribeToMasterclass = subscribeToMasterclass
exports.completeAssessment = completeAssessment