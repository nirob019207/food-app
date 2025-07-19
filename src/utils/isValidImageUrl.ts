export function isValidImageUrl(
  url: string,
  invalidDomains: string[] = ["example.com", "placeholder.com", "image.com"]
): boolean {
  // Check if the URL matches a common image extension
  const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
  const isImage = imageRegex.test(url);

  // Check if the URL's domain is in the list of invalid domains
  const domain = new URL(url).hostname;
  const isInvalidDomain = invalidDomains.some((invalidDomain) =>
    domain.includes(invalidDomain)
  );

  return isImage && !isInvalidDomain;
}
