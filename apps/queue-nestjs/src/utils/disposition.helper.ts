/**
 * Builds a Content-Disposition header value.
 *
 * @param type - 'browser' = show in browser (e.g. image), 'download' = trigger download
 * @param filename - Optional. Suggested filename when downloading (use with download).
 *
 * @example
 * // Download as "medellin.jpg"
 * @Header('Content-Disposition', createDispositionHeader('download', 'medellin.jpg'))
 *
 * @example
 * // Show in browser (default for images)
 * @Header('Content-Disposition', createDispositionHeader('browser'))
 */
export function createDispositionHeader(
  type: 'browser' | 'download',
  filename?: string,
): string {
  const disposition = type === 'download' ? 'attachment' : 'inline';
  if (filename) {
    return `${disposition}; filename="${filename}"`;
  }
  return disposition;
}
