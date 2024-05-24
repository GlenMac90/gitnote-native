export const applyCodeStyles = (html: string) => {
  const style =
    "background-color: #131625; padding: 8px; border-radius: 6px; color: white; border: 1px solid #1D2032;";
  return html.replace(
    /<code\s+type="([^"]*)">([^<]*)<\/code>/g,
    `<div style="${style}"><code type="$1">$2</code></div>`
  );
};
