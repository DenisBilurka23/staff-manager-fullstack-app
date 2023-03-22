export const parseErrors = (errors) => {
  const parsedErrors = errors.map((error) => error.message);
  return parsedErrors?.length ? parsedErrors : null;
};
