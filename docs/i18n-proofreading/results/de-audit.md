# Deutsche Kandidatenprüfung

Geprüft wurden die 186 Einträge in `results/de.json` im Abgleich mit `tables/de.json`. Alle 186 Kombinationen aus `file`, `key` und `oldLiteral` lassen sich einer Tabellenzeile zuordnen. In der Tabelle haben 1.444 Zeilen `sourceMatches`; `reviewedRows` im Ergebnis steht dagegen auf 1.476.

**Freigabe: derzeit nicht empfohlen.** Es gibt zwei klare Textzuordnungsfehler, mehrere Bedeutungsverschiebungen und Korrekturen an Texten, die laut Umfangsvorgabe englisch bleiben sollen.

## Muss korrigiert werden

| file / key | Empfohlenes newText | Grund |
|---|---|---|
| `web/src/i18n/group.ts` / `about.divisionsTitle` | `Mehrere Zugänge zum wissenschaftlichen Publikationsbestand.` | „Wege in die wissenschaftliche Dokumentation“ klingt im Deutschen unnatürlich und trifft den Zugang zum veröffentlichten Forschungsbestand nicht gut. |
| `web/src/i18n/research-assessment.ts` / `researchAssessment.scopeText` | `Diese öffentliche Erklärung gilt für Zeitschriften, Bücher und wissenschaftliche Dienste sowie für die redaktionellen und verlegerischen Praktiken der Panorama Scholarly Group Ltd und ihrer Imprints.` | Die neue Fassung lässt die Imprints und die verlegerischen Praktiken aus dem englischen Ausgangstext weg. |
| `web/src/i18n/sections.ts` / `publishing.imprintsLede` | `Fünf redaktionelle Bereiche, vereint durch das Bekenntnis zu offener und nachvollziehbarer wissenschaftlicher Praxis.` | „Rechenschaftspflichtige Wissenschaft“ ist eine unidiomatische, missverständliche Übertragung von „accountable scholarship“. |
| `web/src/i18n/sections.ts` / `books.heroLede` | `Wir entwickeln methodisch fundierte Forschung zu Büchern für Lesende, Lehrende und Forschende aus allen Fachgebieten und aus aller Welt.` | „Aus allen Disziplinen und aus aller Welt“ kann sich auf die Herkunft der Bücher statt auf ihre Reichweite beziehen. |
| `web/src/i18n/sections.ts` / `books.formats[3].description` | `Verlässliche Lehr- und Lernmaterialien.` | „Bewährte“ bedeutet eher erprobt als verlässlich; die vorhandene Übersetzung trifft „trusted“ besser. |
| `web/src/i18n/imprints.ts` / `imprint.health-nexus.39` | `Translationale Forschung` | Der etablierte Fachbegriff wurde durch eine erklärende Formulierung ersetzt, die den Begriff als Fachgebiet nicht mehr wiedergibt. Die bisherige Übersetzung ist korrekt. |
| `web/src/i18n/imprints.ts` / `imprint.health-nexus.43` | `für eine offenere Zukunft.` | „with a broader tomorrow“ wird zu „damit sie mehr Menschen erreicht“ umgedeutet und verliert den Zukunftsbezug. Zusammen mit der vorherigen Zeile ergibt sich: „Teilen Sie Ihre Forschung für eine offenere Zukunft.“ |
| `web/src/i18n/imprints.ts` / `imprint.verdant-science.49` | `Ländliche Systeme und Governance` | Das vorgeschlagene newText über Klimadynamik und Nachhaltigkeit passt überhaupt nicht zu „Rural systems and governance“. Die vorhandene Übersetzung ist passend; die falsche Korrektur entfernen. |
| `web/src/i18n/imprints.ts` / `imprint.charter.156` | `Selbstverpflichtung zur dauerhaften Sicherung des wissenschaftlichen Publikationsbestands.` | „Selbstverpflichtungen für eine dauerhaft verlässliche wissenschaftliche Dokumentation“ ist schwer verständlich und verschiebt die Aussage. |
| `web/src/i18n/imprints.ts` / `imprint.threnody.144` | `Selbstverpflichtung zur dauerhaften Sicherung des wissenschaftlichen Publikationsbestands.` | Gleiche Formulierung wie bei `imprint.charter.156`; dort wie hier ist die neue Fassung unidiomatisch. |

## Umfangsvorgabe: englisch belassen

Die folgenden Korrekturen übersetzen Beschreibungen eines Journals oder eines konkreten Journalprogramms. Gemäß der Vorgabe, Journalnamen und Journalbeschreibungen englisch zu lassen, diese Korrekturen aus der Kandidatenliste entfernen und den betreffenden Inhalt englisch belassen:

| file / key | Grund |
|---|---|
| `web/src/i18n/content.ts` / `content.journals.lede` | Einleitung zum Journalverzeichnis. |
| `web/src/i18n/imprints.ts` / `imprint.verdant-science.18` | Beschreibung der Zeitschriften und ihres Forschungsprofils. |
| `web/src/i18n/imprints.ts` / `imprint.charter.24` | Beschreibung des wachsenden Journalprogramms. |
| `web/src/i18n/imprints.ts` / `imprint.charter.94` | Beschreibung von Profil und Fachgemeinschaft der einzelnen Charter-Zeitschriften. |
| `web/src/i18n/imprints.ts` / `imprint.threnody.13` | Einleitung zum Threnody-Journalprogramm und zu den darin gezeigten Titeln. |
| `web/src/i18n/imprints.ts` / `imprint.threnody.101` | Portfolio-Beschreibung der Threnody-Zeitschriften und ihrer Titel. |
| `web/src/i18n/imprints.ts` / `imprint.threnody.114` | Beschreibung der Profile und Leserschaften der einzelnen Threnody-Zeitschriften. |

## Datenbereinigung

- Sechs Korrekturen stehen jeweils zweimal im Ergebnis. Je einen doppelten Eintrag entfernen: `policy.editorial.railText`, `imprint.charter.1`, `imprint.charter.156`, `imprint.threnody.38`, `imprint.threnody.118` und `imprint.threnody.144`.
- `reviewedRows` ist 1.476, obwohl 1.444 Tabellenzeilen `sourceMatches` enthalten. Den Zähler an die tatsächlich geprüften Zieltextzeilen anpassen oder seine abweichende Zählweise dokumentieren.

Die Labels `Update` und `Call for papers` wurden lokalisiert; das ist erlaubt. In den geprüften Korrekturen fand sich keine übersetzte Ankündigungsnachricht, kein Artikeltext und kein Autorenname.
