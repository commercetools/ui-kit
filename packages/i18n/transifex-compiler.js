// NOTE: this should not be needed anymore once we fully migrated to STRUCTURED_JSON format.
exports.compile = function compile(msgs) {
  const normalizedMessages = Object.entries(msgs).reduce(
    (messages, [id, msg]) => {
      // Key/Value JSON format
      if (typeof msg === 'string') {
        return {
          ...messages,
          [id]: msg,
        };
      }

      // Structured JSON format
      return {
        ...messages,
        [id]: msg.string,
      };
    },
    {}
  );

  return normalizedMessages;
};
