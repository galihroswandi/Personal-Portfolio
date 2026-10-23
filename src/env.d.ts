interface ImportMetaEnv {
  /** Google Search Console HTML-tag verification token. Rendered only when set. */
  readonly PUBLIC_GSC_VERIFICATION?: string;
  /** Bing Webmaster Tools verification token (`msvalidate.01`). Rendered only when set. */
  readonly PUBLIC_BING_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
