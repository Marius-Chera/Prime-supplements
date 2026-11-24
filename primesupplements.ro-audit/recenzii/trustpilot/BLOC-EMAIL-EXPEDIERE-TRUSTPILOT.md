# Blocul Trustpilot din e-mailul Shopify „Shipping confirmation” (24.11.2026)

**Unde:** Shopify → Setări → Notificări → Notificări clienți → Shipping confirmation → Edit code. Din 24.11 (după-amiaza) blocul stă imediat **înainte** de secțiunea `<h3>Articolele din această expediere</h3>` (sub „Vezi comanda”). Tot atunci s-a scos butonul Shop: `{% if false and shop_app_tracking_url … %}` (pentru revenire se șterge „false and ”).
**De ce:** varianta B, aleasă de Marius pe 24.11. Planul gratuit Trustpilot nu are șablon de invitație în română, așa că toți clienții primesc linkul general de recenzie, în română, în e-mailul de expediere. Fără recompensă și fără selecție, conform regulilor Trustpilot. Recenziile vin ca „organice” (fără eticheta „Verified”).
**Cum revii la forma veche:** ștergi tot ce e între `<!-- TRUSTPILOT-RECENZIE START` și `<!-- TRUSTPILOT-RECENZIE END -->` (inclusiv), apoi Save. Restul șablonului rămâne neschimbat.

```html
<!-- TRUSTPILOT-RECENZIE START (adăugat 24.11.2026) -->
<table class="row section">
  <tr>
    <td class="section__cell">
      <center>
        <table class="container"{% if buyer_email_rtl == true %} dir="rtl"{% endif %}>
          <tr>
            <td>
              <h3 style="margin:0 0 8px;">Cum a fost comanda ta?</h3>
              <p style="margin:0 0 16px;">Ne spui pe Trustpilot? Livrarea, ambalajul, comunicarea cu noi: orice părere sinceră, bună sau rea, ne ajută să facem lucrurile mai bine. Durează un minut.</p>
              <table class="row actions">
                <tr>
                  <td class="actions__cell">
                    <table class="button main-action-cell">
                      <tr>
                        <td class="button__cell" style="background:#00b67a;"><a href="https://www.trustpilot.com/evaluate/primesupplements.ro" class="button__text" style="color:#ffffff;">&#9733; Lasă o recenzie pe Trustpilot</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </td>
  </tr>
</table>
<!-- TRUSTPILOT-RECENZIE END -->
```
