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
