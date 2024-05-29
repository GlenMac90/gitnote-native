export const applyCodeStyles = (html: string) => {
  const style = "background-color: #131625; padding: 8px; color: white;";
  return html.replace(
    /<code\s+type="([^"]*)">([^<]*)<\/code>/g,
    `<div style="${style}"><code type="$1">$2</code></div>`
  );
};

export function formatDate(dateString: number): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}...` : text;
}
