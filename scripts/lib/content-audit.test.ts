import { describe, expect, it } from 'vitest';
import { auditContent, type ContentInputs } from './content-audit';

const ready: ContentInputs = {
  files: [
    { path: 'a.mdx', text: '---\nreviewed: true\n---\n\nReal text with a [link](https://x.dev).' },
  ],
  siteValues: { email: 'me@example.dev' },
  socialLinks: { github: 'https://github.com/me' },
  reviewedLangs: { id: true },
  cvExists: { id: true },
};

describe('auditContent', () => {
  it('passes ready content', () => {
    expect(auditContent(ready)).toEqual({ blocking: [], notes: [] });
  });

  it('blocks unreviewed files and languages, and placeholders', () => {
    const { blocking } = auditContent({
      ...ready,
      files: [
        {
          path: 'b.mdx',
          text: "---\n# TODO(review): [ignored in a comment]\nstack: [C++, Qt]\nreviewed: false\nresult: '[isi hasil]'\n---\n\n[isi studi kasus lengkap]",
        },
      ],
      siteValues: { email: '[email Anda]' },
      reviewedLangs: { id: true, en: false },
    });
    expect(blocking).toEqual([
      'src/i18n/ui.ts: "en" strings are not reviewed (reviewedLangs)',
      'b.mdx: reviewed: false',
      'b.mdx: placeholders [isi hasil], [isi studi kasus lengkap]',
      'src/config/site.ts: email is "[email Anda]"',
    ]);
  });

  it('only notes unset social links and a missing CV (they are hidden, not broken)', () => {
    const result = auditContent({
      ...ready,
      socialLinks: { github: '#' },
      cvExists: { id: false },
    });
    expect(result.blocking).toEqual([]);
    expect(result.notes).toHaveLength(2);
  });
});
