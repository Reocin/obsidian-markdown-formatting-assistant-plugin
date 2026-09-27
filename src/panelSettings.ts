/**
 * Where the side panel's buttons sit. A leaf module with no imports, so the
 * tests can reach it - see the note in textPlacement.ts.
 *
 * The same three choices as the toolbar's, and deliberately so: they share
 * their labels in the translation files and their naming in the stylesheet,
 * and a test holds the two lists together. They stay separate values because
 * the defaults differ - the toolbar starts on the left, where the text starts,
 * and the panel stays centred, as it has always been drawn.
 */

export type panelAlignment = 'left' | 'center' | 'right';

export const PANEL_ALIGNMENTS: panelAlignment[] = ['left', 'center', 'right'];

// Centred, so nobody's panel changes under them on update. Issue #94 asked for
// the choice, not for a different default.
export const DEFAULT_PANEL_ALIGNMENT: panelAlignment = 'center';

/** Anything unrecognised falls back to the default rather than to no layout. */
export function normalisePanelAlignment(value: unknown): panelAlignment {
  return PANEL_ALIGNMENTS.includes(value as panelAlignment)
    ? (value as panelAlignment)
    : DEFAULT_PANEL_ALIGNMENT;
}
