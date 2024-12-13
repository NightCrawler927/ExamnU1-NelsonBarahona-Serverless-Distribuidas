exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hola mundo!",
      input: event,
    }),
  };
};
