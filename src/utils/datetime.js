export const localizeTimeString = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString();
};
