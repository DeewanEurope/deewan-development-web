import type { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { setConsent, useConsent } from "./consentStore";
import "./consent.css";

interface Props {
  /** Company shown to the visitor, e.g. "YouTube" or "Google Maps". */
  provider: string;
  /** The iframe. It is only rendered after the visitor allows outside content. */
  children: ReactNode;
  /** Applied to the placeholder so it takes the iframe's place and size. */
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function ExternalContent({ provider, children, className, style, id }: Props) {
  const { t } = useTranslation();
  const allowed = useConsent() === "granted";
  if (allowed) return <>{children}</>;

  return (
    <div id={id} className={`dc-placeholder ${className ?? ""}`} style={style}>
      <div className="dc-placeholder-inner">
        <p className="dc-placeholder-text">{t("consent.placeholder", { provider })}</p>
        <button type="button" className="dc-btn" onClick={() => setConsent("granted")}>
          {t("consent.load")}
        </button>
      </div>
    </div>
  );
}
