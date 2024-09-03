export const convertToCamelCase = (str) => {
    str = str.replace(/\s(.)/g, (match, char) => char.toUpperCase());
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str; 
  }