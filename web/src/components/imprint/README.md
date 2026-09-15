# components/imprint

Imprint-specific presentation components. Brand landing pages and their
section pages keep their own editorial composition, while sharing the
`ImprintHeader` and `ImprintFooter` shell for consistent branding, navigation,
search/language controls, legal links, and responsive behavior.

The shell consumes imprint identity data from `src/data/imprints.json` via
`src/lib/content/imprints.ts`; page-level components remain responsible for
their own accent palette, hero art, journal programme, and editorial content.
