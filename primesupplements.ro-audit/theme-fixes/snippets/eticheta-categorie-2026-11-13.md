# Eticheta de categorie de pe blog (13.11.2026)

Aprobat de proprietar („Da, aplic-o”, 13.11.2026). Aplicat în tema live „Prime – BLACK FRIDAY (se publică 30.10)” (`gid://shopify/OnlineStoreTheme/194021753207`) prin `themeFilesUpsert`, din admin-ul Shopify.

**Problema:** Shopify ordonează etichetele alfabetic, iar tema afișa `article.tags.first`, deci deasupra titlului (și pe cardurile de pe blog) apărea „hub:vitamine-si-minerale” sau „intent:…” în loc de categorie, la toate articolele din „Vitamine și minerale”, „Proteine”, „Pre-workout”, „Aminoacizi”, „Sănătate”.

**Reparația:** se afișează prima etichetă care nu conține „:”; dacă nu există, rămâne prima etichetă. Blocul adăugat:

```liquid
{%- liquid
  assign category_tag = blank
  for t in article.tags
    unless t contains ':'
      assign category_tag = t
      break
    endunless
  endfor
  if category_tag == blank
    assign category_tag = article.tags.first
  endif
-%}
```

- `snippets/article-banner.liquid`: blocul (indentat cu 4 spații) pus înaintea `{%- if article.tags.size > 0 -%}`; în linkul badge-ului `article.tags.first` → `category_tag` (de două ori).
- `snippets/blog-post-card.liquid`: blocul pus înaintea `{%- capture card_content -%}`; `{{ article.tags | first }}` → `{{ category_tag }}` (două apariții).

**Revenire:** se șterge blocul și se pun înapoi `article.tags.first` / `{{ article.tags | first }}`. Versiunea veche a `article-banner.liquid` e identică cu `theme-fixes/snippets/article-banner.liquid` (verificat prin amprentă înainte de modificare).

**Verificat live:** omega-3-peste-suplimente-alegi → „Vitamine și minerale”, coenzima-q10-ubiquinona → „Sănătate”, shake-proteic → „Proteine”, creatina-femei → „Creatină”; pe /blogs/news cardurile arată categoriile; nicio „Liquid error”; linkul etichetei (/blogs/news/tagged/vitamine-și-minerale) răspunde 200.
