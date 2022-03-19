function joinAddress(addressObj) {
  return `${addressObj.street}, ${addressObj.ward}, ${addressObj.province}, ${addressObj.city}`;
}

function simplifyString(string, count) {
  return string.length < count ? string : string.slice(0, count).concat('...');
}

export { joinAddress, simplifyString };
