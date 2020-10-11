const removeDeletedAttr = (data) => {
  return data.map(({ _id, content, title, createdAt, updatedAt, __v }) => {
    return { _id, content, title, createdAt, updatedAt, __v };
  });
};

module.exports = { removeDeletedAttr };
