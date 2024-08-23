// resolve
function resolveTags(givenTag) {
  const [major, minor] = givenTag.split('.');
  return [major, `${major}.${minor}`];
}

export {
  resolveTags
};
