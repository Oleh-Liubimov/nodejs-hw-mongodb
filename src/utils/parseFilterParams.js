const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isTypes = (contactType) => ['work', 'home', 'personal'].includes(contactType);
  if (isTypes(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  const boolString = typeof isFavourite === 'string';
  if (!boolString) {
    return;
  } else {
    return isFavourite;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
