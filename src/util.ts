/* eslint-disable import/prefer-default-export */
export const selectElementText = (element: Element): void => {
  const selection = window.getSelection();
  if (!selection) return;

  selection.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.addRange(range);
};
