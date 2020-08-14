const sortMessages = (localeMessages) => {
  // Sort the translation JSON file so that git diffing is easier
  // Otherwise the translation messages will jump around every time we extract
  const sortedMessages = {};
  Object.keys(localeMessages)
    // transform strings to lowercase to imitate phraseapp sorting
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach((key) => {
      sortedMessages[key] = localeMessages[key];
    });
  return sortedMessages;
};

// TODO: use the built-in transformer if we decide to change the transifex format to STRUCTURED_JSON
// https://docs.transifex.com/formats/json/structured-json
exports.format = function format(msgs) {
  const normalizedMessages = Object.entries(msgs).reduce(
    (messages, [id, msg]) => ({
      ...messages,
      [id]: msg.defaultMessage,
    }),
    {}
  );
  return sortMessages(normalizedMessages);
};
