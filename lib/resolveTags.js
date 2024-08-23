// resolve
function resolveTags(givenTag) {
  const [major, minor] = givenTag.split('.');
  return [major, `${major}.${minor}`];
}

module.exports = {
  resolveTags
};
