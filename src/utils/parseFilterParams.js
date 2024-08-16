const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isTypes = (contactType) => ['work', 'home', 'personal'].includes(contactType);
  if (isTypes(contactType)) return contactType;
};

const parseIsFavorite = (isFavorite) => {
  const boolString = typeof isFavorite === 'string';
  if (!boolString) {
    return;
  } else {
    return isFavorite;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavorite = parseIsFavorite(isFavorite);

  return {
    contactType: parsedContactType,
    isFavorite: parsedIsFavorite,
  };
};
