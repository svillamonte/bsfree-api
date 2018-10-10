const mapShout = (tableRow) => {
  const { ShoutId, Nick, Body, ImageUri } = tableRow;

  // Table Storage has a weird structure...
  return {
    shoutId: ShoutId['_'],
    nick: Nick['_'],
    body: Body['_'],
    imageUri: ImageUri['_'],
  };
};

export default (result) => {
  const { entries, continuationToken } = result;

  return {
    shouts: entries.map((entry) => mapShout(entry)),
    continuationToken,
  };
};
