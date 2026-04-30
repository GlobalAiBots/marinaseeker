export interface H2Block {
  heading: string;
  body: string;
}

export interface StateEditorial {
  // Brief intro paragraph that REPLACES the generic intro (~70-90 words)
  introOverride?: string;
  // 3 H2 sections inserted between cities sub-grid and marina list
  h2Blocks: H2Block[];
  // Optional additional FAQs appended to the existing FAQPage; the
  // already-present generic FAQs are kept.
  faqExtra?: { q: string; a: string }[];
}

export const STATE_EDITORIAL: Record<string, StateEditorial> = {
  // Top-10 entries will be added one or two at a time:
  // florida, new-york, california, michigan, maryland, washington,
  // north-carolina, massachusetts, new-jersey, virginia
};

export function getStateEditorial(stateSlug: string): StateEditorial | null {
  return STATE_EDITORIAL[stateSlug] || null;
}
