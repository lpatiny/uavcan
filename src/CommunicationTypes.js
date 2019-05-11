const COMMUNICATION_TYPE_REQUEST = 1;
const COMMUNICATION_TYPE_RESPONSE = 2;
const COMMUNICATION_TYPE_MESSAGE = 3;

function getTypeFromText(communicationType) {
  switch (communicationType.toLowerCase()) {
    case 'request':
      return COMMUNICATION_TYPE_REQUEST;
    case 'response':
      return COMMUNICATION_TYPE_RESPONSE;
    case 'message':
      return COMMUNICATION_TYPE_MESSAGE;
    default:
      throw new Error(
        'getTypeFromText: unknown message type: ',
        communicationType
      );
  }
}

function getVariables(messageKind, communicationType) {
  if (!messageKind) {
    throw new Error('getVariables: messageKind is undefined');
  }
  if (typeof communicationType === 'string') {
    communicationType = getTypeFromText(communicationType);
  }
  if (!communicationType) {
    throw new Error('getVariables: type is undefined');
  }
  switch (communicationType) {
    case COMMUNICATION_TYPE_MESSAGE:
      if (!messageKind.message) return [];
      return messageKind.message.variables;
    case COMMUNICATION_TYPE_RESPONSE:
      if (!messageKind.response) return [];
      return messageKind.response.variables;
    case COMMUNICATION_TYPE_REQUEST:
      if (!messageKind.request) return [];
      return messageKind.request.variables;
    default:
      throw new Error(
        'getDefinition: unknown message type: ',
        communicationType
      );
  }
}

module.exports = {
  TYPE_MESSAGE: COMMUNICATION_TYPE_MESSAGE,
  TYPE_REQUEST: COMMUNICATION_TYPE_REQUEST,
  TYPE_RESPONSE: COMMUNICATION_TYPE_RESPONSE,
  getVariables
};
