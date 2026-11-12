import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CONSENT_OPEN_EVENT, setConsent, useConsent } from "./consentStore";
import "./consent.css";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const choice = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (choice !== null && !reopened) return null;

  const decide = (c: "granted" | "denied") => {
    setConsent(c);
    setReopened(false);
  };

  return (
    <div className="dc-banner" role="dialog" aria-live="polite" aria-labelledby="dc-banner-title">
      <p id="dc-banner-title" className="dc-banner-title">{t("consent.title")}</p>
      <p className="dc-banner-text">
        {t("consent.text")}{" "}
        <a href="/datenschutz" className="dc-banner-link">{t("consent.privacy")}</a>
      </p>
      <div className="dc-banner-actions">
        <button type="button" className="dc-btn" onClick={() => decide("denied")}>
          {t("consent.only_necessary")}
        </button>
        <button type="button" className="dc-btn" onClick={() => decide("granted")}>
          {t("consent.allow")}
        </button>
      </div>
    </div>
  );
}
