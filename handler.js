const randomErrorResponse = () => {
  const errors = [400, 401, 403, 404, 500];
  return errors[Math.floor(Math.random() * errors.length)];
};

module.exports.flaky = async (event) => {
  const shouldTimeout = Math.random() < 0.2;
  const shouldFail = Math.random() < 0.4;

  if (shouldTimeout) {
    await new Promise((resolve) => setTimeout(resolve, 11000));
  }

  if (shouldFail) {
    return {
      statusCode: randomErrorResponse(),
      body: JSON.stringify({ message: 'An error occurred.' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
