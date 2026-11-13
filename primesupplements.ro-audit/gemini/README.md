# Gemini din Claude (PC-ul lui Marius) – 13.11.2026

Claude poate cere „a doua părere” de la Google Gemini direct din sesiunile de pe calculator.

- **Cheia:** variabila Windows `GEMINI_API_KEY` (utilizator), cheia „Default Gemini Key” (…Ky2w) din proiectul *Default Gemini Project*, **Free tier**, cont contact@. Nu se scrie nicăieri în repo. Dacă trebuie refăcută: în Google AI Studio → API Keys se apasă butonul de copiere de pe rând, apoi dublu-click pe `D:\Proiecte Claude\Prime Supplements\Salveaza cheia Gemini.cmd` (citește clipboard-ul și o salvează; acceptă formatul nou `AQ.…` și pe cel vechi `AIza…`).
- Cheia plătită (…6K6g, proiect „Imagini blog shopify”, Tier 1) rămâne doar în mediul cloud, pentru pozele din rutina de blog. Nu se folosește de pe PC.
- **Folosire (Claude):** `powershell -NoProfile -File primesupplements.ro-audit/gemini/intreaba-gemini.ps1 "întrebarea"` – implicit `gemini-3.5-flash`, cu rezerve `gemini-3.5-flash-lite` și `gemini-flash-latest` la 503/429.
- **Limitele planului gratuit (testat 13.11):** `gemini-4-carbon` are cotă 0 pe Free tier (429). `gemini-flash-latest` și `gemini-2.5-flash` au dat 503/404 la test. `gemini-3.5-flash` merge.
- **Gemini CLI** (`npm.cmd install -g @google/gemini-cli`, v0.68.0) e instalat, iar `~/.gemini/settings.json` e setat pe cheie API + `gemini-3.5-flash`. Logarea cu contul Google **nu merge** pentru conturi personale („IneligibleTierError … migrate to Antigravity”). Din sesiunile Claude CLI-ul se blochează sau dă „fetch failed”, așa că se folosește scriptul de mai sus. În terminalul lui Marius rulează cu `gemini.cmd` (PowerShell are scripturile blocate, deci `gemini`/`npm` simple nu merg).
- Instalările npm făcute din uneltele Claude rămân izolate în mediul aplicației și nu se văd din terminal. Programele pentru Marius se instalează din tab-ul de terminal.
