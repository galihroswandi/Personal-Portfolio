export interface MailtoOptions {
  to: string;
  subject?: string;
  body?: string;
}

/** Builds a `mailto:` URL. Subject and body are percent-encoded (spaces as %20, not +). */
export function buildMailto({ to, subject, body }: MailtoOptions): string {
  const params = [
    subject ? `subject=${encodeURIComponent(subject)}` : '',
    body ? `body=${encodeURIComponent(body)}` : '',
  ].filter(Boolean);
  return `mailto:${to}${params.length ? `?${params.join('&')}` : ''}`;
}

/** Splits an address into the parts the page reassembles at runtime. */
export function splitEmail(address: string): { user: string; domain: string } {
  const at = address.lastIndexOf('@');
  return at === -1
    ? { user: address, domain: '' }
    : { user: address.slice(0, at), domain: address.slice(at + 1) };
}
