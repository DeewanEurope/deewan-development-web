import { useEffect } from "react";
import "./impressum.scss";

// Legal notice (Impressum) required by § 5 DDG. The text is kept in German on
// purpose, in every language version, because it is a legal statement.
// Approved by the managing director on 12 Nov 2026. Do not change without approval.
function Impressum() {
  useEffect(() => {
    document.title = "Impressum / Legal notice";
  }, []);

  return (
    <section className="dw-container dw-impressum" lang="de" dir="ltr">
        <h1>Impressum / Legal notice</h1>

        <h2>Betreiber der Website (Angaben gemäß § 5 DDG)</h2>
        <p>Deewan Europe GmbH</p>
        <p>Robert-Bosch-Straße 110</p>
        <p>74081 Heilbronn</p>
        <p>Deutschland</p>
        <p>Sitz der Gesellschaft: Berlin</p>

        <h2>Vertreten durch den Geschäftsführer</h2>
        <p>Mohammad Kamal Mohammad Ayaseh</p>
        <p>E-Mail Geschäftsführung: <a href="mailto:management@deewan.eu">management@deewan.eu</a></p>

        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:+491632929209">+49 163 2929209</a></p>
        <p>E-Mail: <a href="mailto:admin@deewan.eu">admin@deewan.eu</a></p>

        <h2>Registereintrag</h2>
        <p>Registergericht: Amtsgericht Charlottenburg (Berlin)</p>
        <p>Registernummer: HRB 290451 B</p>

        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE465550523</p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>Mohammad Kamal Mohammad Ayaseh, Anschrift wie oben</p>

        <h2>Anbieter der Leistungen in Jordanien / Services are provided by</h2>
        <p><span dir="rtl" lang="ar">شركة ديوان التطور للتعليم الالكتروني ذ.م.م</span></p>
        <p>(Deewan Development for E-Learning LLC)</p>
        <p>Registriernummer 81143, nationale Unternehmensnummer 200211800</p>
        <p>Gesellschaft mit beschränkter Haftung nach jordanischem Recht, eingetragen bei der Companies Control Department (دائرة مراقبة الشركات), Amman.</p>
        <p>Vertreten durch den General Manager Mohammad Kamal Mohammad Ayaseh.</p>
        <p>Anschrift: Al-Baouneyah St. 14, Amman 11191, Jordanien</p>
        <p>Kontakt: <a href="mailto:admin@deewan.eu">admin@deewan.eu</a> · <a href="tel:+491632929209">+49 163 2929209</a></p>

        <p className="dw-impressum-note">Bei Buchungen und Bestellungen ist Ihr Vertragspartner das Unternehmen, das im Bestellvorgang genannt wird.</p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>
  );
}

export default Impressum;
