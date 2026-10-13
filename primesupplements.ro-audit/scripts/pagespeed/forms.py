import json
S = '/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad'
R = []
def r(path, old, new): R.append([path, old, new])

SEC = "{{ section.id | split: '__' | last | handleize | replace: '-', '_' }}"
PRODUCT_DESC = "Adaugă în coș produsul „{{ product.title | strip_html | escape }}” (varianta selectată)."

# product forms
r('snippets/product-card.liquid',
  "            {%- form 'product', product, is: 'product-form' -%}\n",
  "            {%- capture webmcp_tool_name -%}add_to_cart_{{ product.id }}{%- endcapture -%}\n"
  "            {%- capture webmcp_tool_description -%}" + PRODUCT_DESC + "{%- endcapture -%}\n"
  "            {%- form 'product', product, is: 'product-form', toolname: webmcp_tool_name, tooldescription: webmcp_tool_description -%}\n")
r('snippets/buy-buttons.liquid',
  "{%- form 'product', product, is: 'product-form', id: form_id -%}\n",
  "{%- capture webmcp_tool_name -%}add_to_cart_{{ product.id }}{%- endcapture -%}\n"
  "{%- capture webmcp_tool_description -%}" + PRODUCT_DESC + "{%- endcapture -%}\n"
  "{%- form 'product', product, is: 'product-form', id: form_id, toolname: webmcp_tool_name, tooldescription: webmcp_tool_description -%}\n")
r('snippets/horizontal-product.liquid',
  "            {%- form 'product', product, id: product_form_id, is: 'product-form' -%}\n",
  "            {%- capture webmcp_tool_name -%}add_to_cart_{{ product.id }}{%- endcapture -%}\n"
  "            {%- capture webmcp_tool_description -%}" + PRODUCT_DESC + "{%- endcapture -%}\n"
  "            {%- form 'product', product, id: product_form_id, is: 'product-form', toolname: webmcp_tool_name, tooldescription: webmcp_tool_description -%}\n")

# newsletter forms
NL = "Abonează o adresă de e-mail la newsletterul Prime Supplements (oferte, reduceri și produse noi)."
r('sections/footer.liquid',
  "{%- form 'customer', id: 'footer-newsletter', class: 'footer__newsletter-form form' -%}",
  "{%- form 'customer', id: 'footer-newsletter', class: 'footer__newsletter-form form', toolname: 'subscribe_newsletter_footer', tooldescription: '" + NL + "' -%}")
r('sections/newsletter.liquid',
  "    {%- form 'customer', id: newsletter_form_id, class: 'form' -%}\n",
  "    {%- capture webmcp_tool_name -%}subscribe_newsletter_" + SEC + "{%- endcapture -%}\n"
  "    {%- form 'customer', id: newsletter_form_id, class: 'form', toolname: webmcp_tool_name, tooldescription: '" + NL + "' -%}\n")
r('sections/newsletter-popup.liquid',
  "\n          {%- form 'customer', id: newsletter_id, class: 'form' -%}\n",
  "\n          {%- form 'customer', id: newsletter_id, class: 'form', toolname: 'subscribe_newsletter_popup', tooldescription: '" + NL + "' -%}\n")
r('sections/main-blog.liquid',
  "{%- form 'customer', id: 'blog-newsletter', class: 'blog-banner__form form' -%}",
  "{%- form 'customer', id: 'blog-newsletter', class: 'blog-banner__form form', toolname: 'subscribe_newsletter_blog_banner', tooldescription: '" + NL + "' -%}")
r('sections/main-blog.liquid',
  "{%- form 'customer', id: 'blog-posts-newsletter-form', class: 'form form--tight' -%}",
  "{%- form 'customer', id: 'blog-posts-newsletter-form', class: 'form form--tight', toolname: 'subscribe_newsletter_blog', tooldescription: '" + NL + "' -%}")
r('sections/main-password.liquid',
  "{%- form 'customer', class: 'form form--tight' -%}",
  "{%- form 'customer', class: 'form form--tight', toolname: 'subscribe_newsletter_password_page', tooldescription: 'Lasă o adresă de e-mail ca să afli când magazinul se redeschide.' -%}")
r('sections/main-password.liquid',
  "{%- form 'storefront_password', class: 'form' -%}",
  "{%- form 'storefront_password', class: 'form', toolname: 'enter_store_password', tooldescription: 'Intră în magazin cu parola primită de la proprietar, cât timp magazinul este protejat cu parolă.' -%}")

# contact
r('sections/contact.liquid',
  "{%- form 'contact', id: contact_form_id, class: 'form' -%}",
  "{%- capture webmcp_tool_name -%}contact_store_" + SEC + "{%- endcapture -%}\n"
  "        {%- form 'contact', id: contact_form_id, class: 'form', toolname: webmcp_tool_name, tooldescription: 'Trimite un mesaj echipei Prime Supplements (întrebări despre produse, comenzi sau colaborări).' -%}")

# search
SEARCH = 'Caută în magazinul Prime Supplements produse (suplimente, proteine, creatină, echipament) după cuvinte cheie.'
r('sections/main-search.liquid',
  '<form class="main-search-form" action="{{ routes.search_url }}" method="get" role="search">',
  '<form class="main-search-form" action="{{ routes.search_url }}" method="get" role="search" toolname="search_store" tooldescription="' + SEARCH + '" toolautosubmit>')
r('sections/main-search.liquid',
  '<input type="search" name="q" value="{{ search.terms | escape }}"',
  '<input type="search" name="q" value="{{ search.terms | escape }}" toolparamdescription="Cuvintele căutate, de exemplu: creatină monohidrat"')
r('sections/search-drawer.liquid',
  '<form action="{{ routes.search_url }}" method="get" class="v-stack gap-5 sm:gap-8" role="search">',
  '<form action="{{ routes.search_url }}" method="get" class="v-stack gap-5 sm:gap-8" role="search" toolname="search_store_drawer" tooldescription="' + SEARCH + '" toolautosubmit>')
r('sections/search-drawer.liquid',
  '<input type="search" name="q" placeholder=',
  '<input type="search" name="q" toolparamdescription="Cuvintele căutate, de exemplu: creatină monohidrat" placeholder=')

# customer accounts
r('sections/main-customers-login.liquid',
  "{%- form 'customer_login', class: 'form' -%}",
  "{%- form 'customer_login', class: 'form', toolname: 'customer_login', tooldescription: 'Autentificare în contul de client Prime Supplements cu adresa de e-mail și parola.' -%}")
r('sections/main-customers-login.liquid',
  "{%- form 'recover_customer_password', class: 'form' -%}",
  "{%- form 'recover_customer_password', class: 'form', toolname: 'recover_customer_password', tooldescription: 'Trimite pe e-mail linkul de resetare a parolei contului de client.' -%}")
r('sections/main-customers-register.liquid',
  "{%- form 'create_customer', class: 'form' -%}",
  "{%- form 'create_customer', class: 'form', toolname: 'create_customer_account', tooldescription: 'Creează un cont de client Prime Supplements (nume, e-mail, parolă).' -%}")
r('sections/main-customers-activate-account.liquid',
  "{%- form 'activate_customer_password', class: 'form' -%}",
  "{%- form 'activate_customer_password', class: 'form', toolname: 'activate_customer_account', tooldescription: 'Activează contul de client prin alegerea unei parole.' -%}")
r('sections/main-customers-reset-password.liquid',
  "{%- form 'reset_customer_password', class: 'form' -%}",
  "{%- form 'reset_customer_password', class: 'form', toolname: 'reset_customer_password', tooldescription: 'Setează o parolă nouă pentru contul de client.' -%}")
r('snippets/address-form.liquid',
  "  {%- form 'customer_address', address -%}\n",
  "  {%- capture webmcp_tool_name -%}save_customer_address_{{ address.id | default: 'new' }}{%- endcapture -%}\n"
  "  {%- form 'customer_address', address, toolname: webmcp_tool_name, tooldescription: 'Salvează o adresă de livrare în contul de client.' -%}\n")
r('sections/main-customers-addresses.liquid',
  '<form method="post" action="{{ address.url }}">',
  '<form method="post" action="{{ address.url }}" toolname="delete_customer_address_{{ address.id }}" tooldescription="Șterge această adresă din contul de client.">')

# cart
r('sections/main-cart.liquid',
  '<form action="{{ routes.cart_url }}" method="POST" class="cart-form rounded">',
  '<form action="{{ routes.cart_url }}" method="POST" class="cart-form rounded" toolname="update_cart" tooldescription="Actualizează cantitățile și nota din coș sau continuă spre finalizarea comenzii.">')
r('sections/cart-drawer.liquid',
  '<form action="{{ routes.cart_url }}" method="POST" class="buy-buttons {% if section.settings.show_checkout_button %}buy-buttons--compact{% endif %}">',
  '<form action="{{ routes.cart_url }}" method="POST" class="buy-buttons {% if section.settings.show_checkout_button %}buy-buttons--compact{% endif %}" toolname="cart_drawer_checkout" tooldescription="Deschide coșul sau continuă spre finalizarea comenzii.">')
r('sections/variant-added.liquid',
  '<form action="{{ routes.cart_url }}" method="post" class="buy-buttons buy-buttons--compact">',
  '<form action="{{ routes.cart_url }}" method="post" class="buy-buttons buy-buttons--compact" toolname="added_to_cart_checkout" tooldescription="După adăugarea în coș: deschide coșul sau continuă spre finalizarea comenzii.">')
r('snippets/shipping-estimator.liquid',
  '<form action="{{ routes.cart_url }}" class="shipping-estimator__form fieldset">',
  '<form action="{{ routes.cart_url }}" class="shipping-estimator__form fieldset" toolname="estimate_shipping_rates" tooldescription="Estimează costul livrării pentru produsele din coș după țară, județ și cod poștal.">')

# collection filters
r('snippets/collection-top-bar.liquid',
  '<form is="facet-form" update-on-change section-id="{{ section.id }}" method="GET" action="{{ request.path }}" class="contents">',
  '<form is="facet-form" update-on-change section-id="{{ section.id }}" method="GET" action="{{ request.path }}" class="contents" toolname="filter_products_bar" tooldescription="Filtrează și sortează produsele din listă (disponibilitate, preț, tip, brand).">')
r('snippets/facets-vertical.liquid',
  '<form id="facet-form" is="facet-form" section-id="{{ section.id }}" {% if update_on_change %}update-on-change{% endif %} method="GET" action="{{ request.path }}" class="facets-vertical">',
  '<form id="facet-form" is="facet-form" section-id="{{ section.id }}" {% if update_on_change %}update-on-change{% endif %} method="GET" action="{{ request.path }}" class="facets-vertical" toolname="filter_products" tooldescription="Filtrează produsele din listă (disponibilitate, preț, tip, brand).">')

# article comments
r('snippets/article-comments.liquid',
  "{%- form 'new_comment', article, class: 'form' -%}",
  "{%- form 'new_comment', article, class: 'form', toolname: 'post_article_comment', tooldescription: 'Trimite un comentariu la acest articol (nume, e-mail, mesaj); comentariile sunt moderate înainte de publicare.' -%}")

json.dump(R, open(f'{S}/psi/patch/forms.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(R), 'replacements')
