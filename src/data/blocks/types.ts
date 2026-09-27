/** The shared contract for every gallery block. */

export type BlockCategory =
  | "Hero"
  | "Features"
  | "AI surfaces"
  | "Forms & auth"
  | "Data & empty"
  | "Content"
  | "Navigation";

export interface BlockRecord {
  /** kebab-case unique id, e.g. "framed-hero" */
  id: string;
  /** Display name, e.g. "Framed hero with logo row" */
  name: string;
  category: BlockCategory;
  /** Search helpers */
  tags: string[];
  /**
   * Complete standalone HTML: a single root
   *   <div class="blk blk-{id}"> ... <style> ... </style> </div>
   * Everything the preview renders and the copy button ships — one string,
   * zero drift. All CSS selectors MUST be namespaced under .blk-{id}.
   */
  code: string;
}
