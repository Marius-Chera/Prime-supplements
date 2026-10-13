import json, re, sys, hashlib
S = '/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad'
T = f'{S}/psi/stg'
changed = set()

def sub_once(path, old, new):
    p = f'{T}/{path}'
    s = open(p, encoding='utf-8').read()
    n = s.count(old)
    if n != 1:
        sys.exit(f'FAIL {path}: expected 1 match, found {n}: {old[:90]!r}')
    s = s.replace(old, new)
    open(p, 'w', encoding='utf-8').write(s)
    changed.add(path)

# ---------------------------------------------------------------- layout/theme.liquid
sub_once('layout/theme.liquid',
 '''    <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0">
''',
 '''    <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0">
    <script>
      if (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        document.querySelector('meta[name="viewport"]').content += ', maximum-scale=1.0';
      }
    </script>
''')
sub_once('layout/theme.liquid',
 "(charset must sit in the first 1024 bytes; the viewport keeps the live maximum-scale, because removing it makes iOS zoom on focus of inputs smaller than 16px, a visible change left to the owner)",
 "(charset must sit in the first 1024 bytes). Accessibility (2026-10-13): maximum-scale is no longer sent by default, so Android users can pinch-zoom; the inline script adds it back on iOS only, where Safari ignores it for pinch-zoom but uses it to avoid zooming in when an input smaller than 16px gets focus, so iOS behaves exactly as before")
sub_once('layout/theme.liquid',
 '''      <link rel="shortcut icon" href="{{ settings.favicon | image_url: width: 96 }}">''',
 '''      {%- comment -%}rel="icon" (2026-10-13): apps look the favicon up with link[rel="icon"]; with "shortcut icon" the Pop Convert app could not find it and requested /null (a 404 in the console).{%- endcomment -%}
      <link rel="icon" href="{{ settings.favicon | image_url: width: 96 }}">''')
sub_once('layout/theme.liquid',
 '''    {%- comment -%}Few prefetch to increase performance on commonly used third-parties{%- endcomment -%}
    <link rel="preconnect" href="https://cdn.shopify.com">
    <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
''',
 '''    {%- comment -%}Few prefetch to increase performance on commonly used third-parties. Performance (2026-10-13): no preconnect to fonts.shopifycdn.com, theme fonts are served from the shop domain (/cdn/fonts), so that connection was never used.{%- endcomment -%}
    <link rel="preconnect" href="https://cdn.shopify.com">
''')
sub_once('layout/theme.liquid',
 '''    {%- render 'social-meta-tags' -%}''',
 '''    {%- render 'fontify-fonts' -%}
    {%- render 'social-meta-tags' -%}''')
bss = open(f'{S}/psi/assets/bss-custom.css', encoding='utf-8').read().rstrip('\n')
assert hashlib.md5(open(f'{S}/psi/assets/bss-custom.css','rb').read()).hexdigest() == 'fd0ccb65e6a93f60b5dcf16bc0018b28'
bss_inline = '\n'.join(('      ' + l) if l.strip() else '' for l in bss.split('\n'))
sub_once('layout/theme.liquid',
 '''    {{ 'bss-custom.css' | asset_url | stylesheet_tag }}
''',
 '''    {%- comment -%}Performance (2026-10-13): the 470-byte assets/bss-custom.css (BSS B2B app) is inlined, same rules in the same place, to save a render-blocking request. If the BSS app updates that file, copy the new rules here.{%- endcomment -%}
    <style>
''' + bss_inline + '''
    </style>
''')
sub_once('layout/theme.liquid',
 '''        {%- sections 'footer-group' -%}
      {%- endif -%}
    </main>
''',
 '''        {%- sections 'footer-group' -%}
      {%- endif -%}
    </main>

    {%- render 'a11y-fixes' -%}
''')

# ---------------------------------------------------------------- snippets/localization-selector.liquid
sub_once('snippets/localization-selector.liquid',
 '''    <div class="relative">
      <button type="button" class="text-with-icon gap-2.5 group" aria-label="{{ 'general.localization.change_country_accessibility_text' | t | escape }}" aria-controls="{{ localization_popover_id }}" aria-expanded="false">''',
 '''    {%- comment -%}Accessibility (2026-10-13): the accessible name starts with the visible text (e.g. "România (RON lei)"), as WCAG 2.5.3 requires, followed by the action.{%- endcomment -%}
    {%- capture country_visible_text -%}
      {%- if show_country_name -%}
        {{ localization.country.name }} ({{ localization.country.currency.iso_code }} {% if localization.country.currency.symbol %}{{ localization.country.currency.symbol }}){%- endif -%}
      {%- else -%}
        {{ localization.country.currency.iso_code }} {% if localization.country.currency.symbol %}{{ localization.country.currency.symbol }}{%- endif -%}
      {%- endif -%}
    {%- endcapture -%}

    <div class="relative">
      <button type="button" class="text-with-icon gap-2.5 group" aria-label="{{ country_visible_text | strip | escape }} – {{ 'general.localization.change_country_accessibility_text' | t | escape }}" aria-controls="{{ localization_popover_id }}" aria-expanded="false">''')
sub_once('snippets/localization-selector.liquid',
 '''      <button type="button" class="text-with-icon gap-2.5 group" aria-label="{{ 'general.localization.change_language_accessibility_text' | t | escape }}" aria-controls="{{ localization_popover_id }}" aria-expanded="false">''',
 '''      <button type="button" class="text-with-icon gap-2.5 group" aria-label="{{ localization.language.endonym_name | capitalize | escape }} – {{ 'general.localization.change_language_accessibility_text' | t | escape }}" aria-controls="{{ localization_popover_id }}" aria-expanded="false">''')
# WebMCP: localization forms (unique tool name per selector instance)
sub_once('snippets/localization-selector.liquid',
 '''{%- assign popover_horizontal_position = popover_horizontal_position | default: 'end' -%}
''',
 '''{%- assign popover_horizontal_position = popover_horizontal_position | default: 'end' -%}
{%- assign webmcp_location = section.id | split: '__' | last | handleize | replace: '-', '_' -%}
''')
sub_once('snippets/localization-selector.liquid',
 '''        {%- form 'localization', id: localization_form_id -%}
          <x-listbox class="popover-listbox popover-listbox--sm" role="listbox" aria-label="{{ 'general.localization.country' | t | escape }}">''',
 '''        {%- capture webmcp_tool_name -%}change_country_{{ webmcp_location }}_{{ popover_vertical_position }}{%- endcapture -%}
        {%- form 'localization', id: localization_form_id, toolname: webmcp_tool_name, tooldescription: 'Schimbă țara de livrare și moneda magazinului. Parametrul country_code primește codul ISO al țării (de exemplu RO).' -%}
          <x-listbox class="popover-listbox popover-listbox--sm" role="listbox" aria-label="{{ 'general.localization.country' | t | escape }}">''')

for path, old, new in json.load(open(f'{S}/psi/patch/forms.json', encoding='utf-8')):
    sub_once(path, old, new)

# ---------------------------------------------------------------- assets/country-flags.css.liquid
flags = json.load(open(f'{S}/psi/flags-b64.json'))
for cc, pos in (('RO', '-294px -105px'), ('HU', '-210px -189px')):
    one = f"url(data:image/png;base64,{flags[cc + '_1x']})"
    two = f"url(data:image/png;base64,{flags[cc + '_2x']})"
    sub_once('assets/country-flags.css.liquid',
     f'''.country-flags--{cc} {{
  background-position: {pos};
}}''',
     f'''/* Performance (2026-10-13): the only flags this shop shows ({cc} and its neighbour in the list) use pixel-identical
   crops of the sprite, so the 480 KB sprite (155 KB on mobile) is no longer downloaded. */
.country-flags--{cc} {{
  background: -webkit-image-set({one} 1x, {two} 2x) no-repeat top left;
  background: image-set({one} 1x, {two} 2x) no-repeat top left;
}}''')

# ---------------------------------------------------------------- config/settings_data.json (Fontify embed off)
p = f'{T}/config/settings_data.json'
t = open(p, encoding='utf-8').read()
old = '''      "15119538188275799212": {
        "type": "shopify://apps/fontify/blocks/app-embed/334490e2-2153-4a2e-a452-e90bdeffa3cc",
        "disabled": false,'''
assert t.count(old) == 1
t = t.replace(old, old.replace('"disabled": false', '"disabled": true'))
open(p, 'w', encoding='utf-8').write(t); changed.add('config/settings_data.json')

# ---------------------------------------------------------------- sections/footer-group.json (ANPC logos sized)
p = f'{T}/sections/footer-group.json'
t = open(p, encoding='utf-8').read()
for name, w, h in (('logo-anpc-sol.aa50985c.png?v=1748073397\\" alt=\\"ANPC SOL\\" style=\\"height: 50px;\\"', 182, 46),
                   ('logo-anpc-sal.cb86625e.png?v=1748073396\\" alt=\\"ANPC SAL\\" style=\\"height: 50px;\\"', 223, 47)):
    assert t.count(name) == 1, name
    t = t.replace(name, name.replace('style=\\"height: 50px;\\"', f'width=\\"{w}\\" height=\\"{h}\\" style=\\"height: 50px; width: auto;\\"'))
open(p, 'w', encoding='utf-8').write(t); changed.add('sections/footer-group.json')

changed |= {'snippets/fontify-fonts.liquid', 'snippets/a11y-fixes.liquid'}
print('\n'.join(sorted(changed)))
