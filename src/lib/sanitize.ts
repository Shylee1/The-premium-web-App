import DOMPurify from 'isomorphic-dompurify';

export function sanitize(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed for most inputs
    ALLOWED_ATTR: [],
  });
}

export function sanitizeHTML(input: string): string {
  return DOMPurify.sanitize(input);
}
