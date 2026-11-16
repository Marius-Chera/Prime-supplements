# Serverul-releu pe Oracle Cloud (gratuit): pașii pentru Marius (16.11.2026)

**De ce e nevoie de el:** eMAG primește apeluri doar de pe IP-uri aprobate. Serverul acesta are un IP fix și doar transmite mai departe cererile aplicației „Prime eMAG”. Pe el nu se salvează nimic.
**Ce faci tu:** contul, cardul (doar pentru verificare) și crearea serverului.
**Ce fac eu după aceea**, prin SSH: instalarea, securizarea și testul.

## 1. Contul (~10 minute)
1. Intri pe https://www.oracle.com/cloud/free/ și apeși **Start for free**.
2. Ca e-mail folosești contact@primesupplements.ro, iar ca țară România.
3. La **Home Region** alegi **Germany Central (Frankfurt)**.
   - Regiunea nu se mai poate schimba după creare, iar resursele gratuite există doar în ea.
4. Introduci cardul. Oracle face doar o verificare, fără plată.
5. După activare, mergi în meniu → **Billing & Cost Management** → **Upgrade and Manage Payment** → **Upgrade to Pay As You Go**.
   - Contul rămâne gratuit cât folosim doar resurse „Always Free”.
   - Upgrade-ul împiedică oprirea automată a serverului când e puțin folosit.
6. Tot în **Billing**, la **Budgets**, creezi un buget de **1 EUR**, cu alertă pe e-mail la 100 %. Așa afli imediat dacă ar apărea vreodată un cost.

## 2. Serverul (~5 minute)
1. Mergi în meniu → **Compute** → **Instances** → **Create instance**.
2. **Name:** `prime-releu-emag`.
3. **Image:** Canonical **Ubuntu 24.04**.
4. **Shape:** **VM.Standard.E2.1.Micro**, care are eticheta „Always Free-eligible”.
   - Dacă nu e disponibil, alegi **Ampere VM.Standard.A1.Flex**, cu 1 OCPU și 6 GB.
5. **Networking:** lași rețeaua nouă propusă și bifezi **Assign a public IPv4 address**.
6. **Add SSH keys:** alegi **Paste public keys** și lipești exact rândul de mai jos.
   - E doar cheia publică. Cheia privată stă pe calculatorul tău, în `C:\Users\mariu\.ssh\prime-releu-oracle`.
   ```
   ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICMBm29MVtsydMY7h5/ilAKzEjY3bBuzUQhiwO1OpFZg prime-releu-emag
   ```
7. Apeși **Create** și aștepți 1–2 minute, până starea devine RUNNING.

## 3. IP-ul fix
1. Deschizi instanța → **Attached VNICs** → VNIC-ul → **IPv4 Addresses**.
2. La adresa publică, dacă Oracle îți permite, schimbi tipul din **Ephemeral** în **Reserved public IP** (din meniul cu trei puncte → Edit).
   - Fără rezervare, IP-ul se schimbă dacă serverul e șters sau recreat.
3. Copiezi IP-ul public și mi-l trimiți în chat.

## 4. Porturile
Deschizi rețeaua instanței → **Subnet** → **Security List** (Default) → **Add Ingress Rules**:
- Source `0.0.0.0/0`, TCP, Destination port **443**;
- Source `0.0.0.0/0`, TCP, Destination port **80**. E necesar doar pentru certificatul HTTPS gratuit.

Portul 22 (SSH) e deschis implicit. După instalare îl restrâng, ca să accepte doar cheia.

## Ce urmează după ce îmi trimiți IP-ul
- Instalez releul, cu HTTPS gratuit prin Let's Encrypt, firewall și actualizări automate.
- Îl testez cu cereri semnate de aplicație.
- Îți dau textul pentru eMAG cu IP-ul care trebuie aprobat (whitelist).
