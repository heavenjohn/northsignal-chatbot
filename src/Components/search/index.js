const globalSearch = (objects, key) =>
  objects.filter(obj => {
    if (Array.isArray(obj)) {
      let nestedResults = globalSearch(obj, key);
      console.log(nestedResults);

      return nestedResults.length > 0;
    } else if (typeof obj === "object") {
      let nestedResults = globalSearch(Object.values(obj), key);
      return nestedResults.length > 0;
    } else if (
      typeof obj === "string" &&
      obj.toUpperCase().includes(key.toUpperCase())
    ) {
      return true;
    }
    return false;
  });

export default globalSearch;
