import { useSyncExternalStore } from "react";

// Visitor's choice about content from other companies (YouTube, Google Maps,
// Facebook, Instagram, LinkedIn, Canva). Nothing from those companies loads
// until the visitor allows it. The choice stays only in this browser.
export type ConsentChoice = "granted" | "denied" | null;

const KEY = "deewan_external_content";
const CHANGE = "deewan-consent-change";
const OPEN = "deewan-consent-open";

function read(): ConsentChoice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

let current: ConsentChoice = read();

export function setConsent(choice: Exclude<ConsentChoice, null>) {
  current = choice;
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* private mode: keep the choice for this visit only */
  }
  window.dispatchEvent(new Event(CHANGE));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = read();
      cb();
    }
  };
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useConsent(): ConsentChoice {
  return useSyncExternalStore(subscribe, () => current, () => null);
}

/** Opens the banner again (footer "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN));
}

export const CONSENT_OPEN_EVENT = OPEN;
