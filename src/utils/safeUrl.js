// Only allow http(s) links, so a stored URL like "javascript:..." can never run script.
export const isSafeUrl = (url) => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

export const safeUrl = (url) => (isSafeUrl(url) ? url : undefined);
