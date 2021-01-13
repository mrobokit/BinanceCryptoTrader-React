export const formatDate = (string) => {
  var options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};
