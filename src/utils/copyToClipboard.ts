export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(
    () => true, // Successfully copied
    () => false // Failed to copy
  );
}
