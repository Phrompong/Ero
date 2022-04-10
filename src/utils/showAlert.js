export const showAlert = (fn, t) => {
  setTimeout(() => {
    fn(false);
  }, t);
  setTimeout(() => {
    fn(true);
  }, 100);
};
