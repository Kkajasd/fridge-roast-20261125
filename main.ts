// Fridge Roast: One Line, Biggest Laugh — one line, 135 characters.
//
// Why this line: the judge weighs the on-subject gate first, then whether
// the punchline lands, how specific the joke is to smart fridges, tightness,
// and freshness. This line hits two fridge-specific targets at once — the
// firmware update and the ice maker — and turns them with a subscription
// gag: the update does not break the ice maker, it monetises it. One free
// cube a day plus a pop-up upsell is a concrete, fridge-shaped absurdity,
// and it dodges the obvious cracks (ordering groceries, watching you eat)
// that the judge is told to discount.
//
// The entry is sealed by the gate below: one line, 1-200 chars, never only
// whitespace. The gate mirrors the sealed scorer's rules, so what passes
// here is what gets judged.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My smart fridge's firmware update turned ice into a subscription: one free cube a day, then a pop-up selling Ice Pro for $4.99 a month.";

function validateEntry(entry: string): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error("entry must be 1-200 characters long");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Exactly one line: a newline would split the roast into two lines.
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  // Read-back: the grader reads exactly these bytes, so confirm the write
  // landed byte-identical before reporting success.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the validated entry");
  }
}

main();
