import dotenv from "dotenv";
import * as fs from "node:fs/promises";
import * as path from "node:path";

// Translates src/i18n/locales/en.json into the other languages with DeepL.
//
//   npm run translate:ar       only Arabic
//   npm run translate:de       only German
//   npm run translate:all      every language below
//   add --force                re-translate every key, not just new/changed ones
//
// Only keys that are new, or whose English text changed since they were last translated,
// are sent to DeepL. Hand-made fixes in ar.json / de.json are therefore kept until the
// English source of that key changes.

dotenv.config({ path: [".env", ".env.local"], quiet: true });

// ─── Supported languages ────────────────────────────────────────────────────
// key = file name (src/i18n/locales/<key>.json), value = DeepL options for it.
// To add a language: add it here and in src/i18n/index.ts.
const LANGUAGES: Record<string, { target: string; formality?: "prefer_more" | "prefer_less" }> = {
  ar: { target: "AR" },
  de: { target: "DE", formality: "prefer_more" }, // "Sie", as German business sites do
};

// Helps DeepL pick the right tone and vocabulary; it is not translated or billed.
const CONTEXT =
  "Website copy for Deewan, a technology company in Amman, Jordan, that builds websites, " +
  "mobile apps, UI/UX design, social media management and digital marketing. " +
  "Short strings are button labels, menu items and headings.";

const BATCH_SIZE = 50;

const localesDir = path.join("src", "i18n", "locales");
const sourceFile = path.join(localesDir, "en.json");
// English text each translation was made from, per language: lets us spot edited copy
const stateFile = path.join("src", "i18n", "translation-state.json");

const deeplApiKey = process.env.DEEPL_API_KEY?.trim();
const deeplApiUrl = process.env.DEEPL_API_URL?.trim() || "https://api-free.deepl.com/v2/translate";

type Dict = Record<string, string>;
type State = Record<string, Dict>;

// ─── Markup: protect what DeepL must not touch ───────────────────────────────
// en.json uses "\n" for a forced line break, <em>…</em> for highlighted words and
// {{name}} for values filled in by the code. DeepL gets them as XML tags it keeps in place.
function toDeepL(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&lt;(\/?)em&gt;/g, "<$1em>")
    .replace(/\{\{\s*(\w+)\s*\}\}/g, "<x>{{$1}}</x>")
    .replace(/\n/g, "<br/>");
}

function fromDeepL(text: string) {
  return text
    .replace(/\s*<br\s*\/?>\s*/g, "\n")
    .replace(/<\/?x>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

interface DeepLResponse {
  translations: { text: string }[];
}

async function translateBatch(texts: string[], language: string): Promise<string[]> {
  const { target, formality } = LANGUAGES[language];

  const response = await fetch(deeplApiUrl, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texts.map(toDeepL),
      source_lang: "EN",
      target_lang: target,
      context: CONTEXT,
      tag_handling: "xml",
      ignore_tags: ["x"],
      ...(formality && { formality }),
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepL API error (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as DeepLResponse;
  return data.translations.map((item) => fromDeepL(item.text));
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function translateLanguage(language: string, en: Dict, state: State, force: boolean) {
  const outputFile = path.join(localesDir, `${language}.json`);
  const existing = await readJson<Dict>(outputFile, {});
  const translatedFrom = (state[language] ??= {});

  const toTranslate = Object.entries(en).filter(([key, value]) => {
    if (!value.trim()) return false;
    if (force || !existing[key]) return true;
    // translated before, but the English has been edited since
    return translatedFrom[key] !== undefined && translatedFrom[key] !== value;
  });

  console.log(`\n🌍 EN → ${language.toUpperCase()}  (${outputFile})`);

  const result: Dict = { ...existing };

  for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
    const batch = toTranslate.slice(i, i + BATCH_SIZE);
    console.log(`   Translating ${i + 1}–${i + batch.length} of ${toTranslate.length}...`);

    const texts = await translateBatch(batch.map(([, value]) => value), language);
    batch.forEach(([key, value], index) => {
      result[key] = texts[index];
      translatedFrom[key] = value;
    });
  }

  // same key order as en.json, and keys removed from en.json are dropped
  const sorted: Dict = {};
  for (const key of Object.keys(en)) {
    if (result[key]) sorted[key] = result[key];
  }
  for (const key of Object.keys(translatedFrom)) {
    if (!(key in en)) delete translatedFrom[key];
  }

  await writeJson(outputFile, sorted);

  console.log(
    toTranslate.length
      ? `✅ ${toTranslate.length} key(s) translated, ${Object.keys(sorted).length}/${Object.keys(en).length} done.`
      : `✨ Already up to date (${Object.keys(sorted).length}/${Object.keys(en).length} keys).`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const requested = args.filter((arg) => !arg.startsWith("--")).map((arg) => arg.toLowerCase());
  const languages = requested.includes("all") || requested.length === 0 ? Object.keys(LANGUAGES) : requested;

  const unknown = languages.filter((language) => !LANGUAGES[language]);
  if (unknown.length) {
    throw new Error(
      `Unknown language: ${unknown.join(", ")}. Supported: ${Object.keys(LANGUAGES).join(", ")}, all`,
    );
  }

  if (!deeplApiKey) {
    throw new Error("Missing DEEPL_API_KEY. Add it to frontend/.env (this file is not committed).");
  }

  const en = await readJson<Dict>(sourceFile, {});
  const state = await readJson<State>(stateFile, {});

  for (const language of languages) {
    await translateLanguage(language, en, state, force);
    // saved after each language, so a failure later on keeps the work already paid for
    await writeJson(stateFile, state);
  }
}

main().catch((err) => {
  console.error("\n❌ Translation failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
