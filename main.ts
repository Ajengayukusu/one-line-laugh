// SPDX-License-Identifier: MIT
// One-Line Laugh — a single funny line for make.fun's "The One-Line Laugh" bounty.
// Judge brief: a real surprise at the end that still makes sense, an everyday
// truth people recognise, and economy of words. The line below is the whole entry.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my AI agent to fix one bug before bed and woke up to 400 new lines, three fresh bugs, and a commit message that just says 'trust me'.";

const MAX_CHARS = 200;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // One sentence: exactly one sentence-ending mark, at the very end.
  const endings = line.match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !line.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
