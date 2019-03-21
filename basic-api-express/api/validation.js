module.exports = app => {
  const exitsOrError = (value, msg) => {
    if (!value) throw msg;
    if (Array.isArray(value) && value === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  };

  const notExistsOrError = (value, msg) => {
    try {
      exitsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  };

  const equalsOrError = (valueA, valueB, msg) => {
    if (valueA !== valueB) throw msg;
  };
  return { exitsOrError, notExistsOrError, equalsOrError };
};
