const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  console.log(isString);
  if (!isString) return;

  const isTypes = (contactType) => {
    ['work', 'home', 'personal'].includes(contactType);
  };

  if (isTypes(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  const boolString = typeof isFavourite === 'string';
  console.log(boolString);
  if (!boolString) return;

  if (isFavourite === 'true') {
    return 'true';
  } else {
    return 'false';
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  console.log({
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  });

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
