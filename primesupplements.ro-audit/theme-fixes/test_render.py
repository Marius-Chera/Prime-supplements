"""Offline render test for the rewritten JSON-LD snippets using python-liquid with
Shopify filter stubs. Every rendered <script> block must parse as JSON."""
import json, re, sys, datetime
from liquid import Environment, FileSystemLoader

SNIPPETS = sys.argv[1]
env = Environment(loader=FileSystemLoader(SNIPPETS))

# --- Shopify filter stubs -------------------------------------------------
def image_url(img, width=None, height=None, crop=None):
    src = img.get('src') if isinstance(img, dict) else str(img)
    return f"//primesupplements.ro/cdn/shop/files/{src}?width={width}"
def file_url(name): return f"//primesupplements.ro/cdn/shop/files/{name}"
def money_without_currency(cents): return f"{cents/100:.2f}".replace('.', ',')
def t(key, **kw): return key
def json_filter(v):
    if hasattr(v, 'keys'):
        v = dict(v)
    return json.dumps(v, ensure_ascii=False)
env.add_filter('json', json_filter)
env.add_filter('image_url', image_url)
env.add_filter('file_url', file_url)
env.add_filter('money_without_currency', money_without_currency)
env.add_filter('t', t)

# --- mock objects -------------------------------------------------------------
shop = {'url': 'https://primesupplements.ro', 'name': 'Prime Supplements', 'currency': 'RON'}
cart = {'currency': {'iso_code': 'RON'}}
variants = [
    {'id': 55179979030903, 'title': '1 buc', 'price': 850, 'available': True, 'sku': '6421766062509', 'barcode': '6421766062509'},
    {'id': 55179979063671, 'title': 'Cutie 12 buc', 'price': 9600, 'available': False, 'sku': '', 'barcode': ''},
    {'id': 55179979096439, 'title': 'Pachet mare', 'price': 31000, 'available': True, 'sku': 'X-1', 'barcode': '5941234567890'},
]
images = [{'src': 'a.jpg'}, {'src': 'b "quoted" & co.jpg'}]
product = {
    'title': 'Baton proteic căpșuni "Prime" 50g',
    'handle': 'baton-proteic-capsuni',
    'url': '/products/baton-proteic-capsuni',
    'vendor': 'primesupplements1',
    'type': '',
    'description': '<p>Mod de administrare</p>\n<p>După cum este necesar în ceea ce privește compoziția dietei "citat" & amp.</p>\n<ul><li>Ingrediente: Matrice proteică</li></ul>',
    'images': images,
    'featured_image': images[0],
    'variants': variants,
    'selected_or_first_available_variant': variants[0],
    'available': True,
    'collections': [
        {'handle': 'all', 'title': 'All Products', 'url': '/collections/all'},
        {'handle': 'batoane-proteice', 'title': 'Batoane Proteice', 'url': '/collections/batoane-proteice'},
    ],
    'metafields': {'reviews': {'rating': {'value': {'rating': '5.0', 'scale_min': '1.0', 'scale_max': '5.0'}}, 'rating_count': {'value': 17}}},
}
product_no_reviews = dict(product, metafields={'reviews': {'rating': {'value': None}, 'rating_count': {'value': None}}}, vendor='Prime Supplements', type='Batoane proteice', collections=[])
article = {
    'title': 'BCAA vs. EAA: Diferențe "și" Beneficii\nlinie nouă',
    'url': '/blogs/news/bcaa-vs-eaa',
    'author': 'Marius Chera , Nutriționist Certificat',
    'excerpt_or_content': '<p>Descoperă diferențele\nesențiale "dintre" BCAA și EAA.</p>',
    'content': '<p>Descoperă diferențele esențiale dintre BCAA și EAA. ' + 'cuvânt ' * 300 + '</p>',
    'published_at': datetime.datetime(2025, 5, 29, 0, 13, 37, tzinfo=datetime.timezone(datetime.timedelta(hours=3))),
    'updated_at': datetime.datetime(2026, 9, 1, 12, 0, 0, tzinfo=datetime.timezone(datetime.timedelta(hours=3))),
    'image': {'src': 'hero.jpg', 'width': 1200, 'height': 628},
}
article_org = dict(article, author='primesupplements1', image=None)
collection = {
    'title': 'Pudre "Proteice"', 'handle': 'pudra-proteica', 'url': '/collections/pudra-proteica',
    'description': '<p>Descriere\nnouă & veche</p>', 'image': {'src': 'c.jpg'}, 'products_count': 5,
    'products': [{'title': 'Prime Whey 1000g', 'url': '/products/prime-whey-1000g', 'featured_image': {'src': 'w.jpg'}}, {'title': 'Pure Isolate', 'url': '/products/pure-isolate-2000g', 'featured_image': None}],
}
collection_empty = dict(collection, description='', image=None, products=[], products_count=0)
blog = {'title': 'Ultimele articole'}

def render(name, ctx):
    tpl = env.get_template(name)
    return tpl.render(**ctx)

def check(label, html):
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    assert blocks, f'{label}: no script block'
    for b in blocks:
        try:
            d = json.loads(b)
        except Exception as e:
            print(f'FAIL {label}: {e}\n{b[:1200]}'); return None
        print(f'ok   {label}: {len(b)} chars, top-level @type={d.get("@type") or [x.get("@type") for x in d.get("@graph", [])]}')
        return d

base = {'shop': shop, 'cart': cart, 'request': {'page_type': 'product'}, 'blog': blog}
d = check('product (reviews, multiline desc, quotes, vendor fallback)', render('schema-product-enhanced.liquid', dict(base, product=product, collection=product['collections'][0])))
if d:
    offers = d['offers']; assert isinstance(offers, list) and len(offers) == 3
    assert offers[0]['price'] == 8.5 and offers[2]['price'] == 310.0, offers
    assert offers[2]['shippingDetails']['shippingRate']['value'] == 0 and offers[0]['shippingDetails']['shippingRate']['value'] == 20
    assert offers[1]['availability'].endswith('OutOfStock') and 'sku' not in offers[1]
    assert d['brand']['name'] == 'Prime Supplements' and 'category' not in d
    assert d['aggregateRating']['ratingCount'] == 17 and d['aggregateRating']['ratingValue'] == '5.0'
    assert '\n' not in d['description'] and 'citat' in d['description']
    assert re.match(r'\d{4}-\d{2}-\d{2}$', offers[0]['priceValidUntil'])
    print('     product assertions passed; description =', d['description'][:90])
d = check('product (no reviews, type+vendor set, no collections)', render('schema-product-enhanced.liquid', dict(base, product=product_no_reviews)))
if d:
    assert 'aggregateRating' not in d and d['category'] == 'Batoane proteice' and d['brand']['name'] == 'Prime Supplements'
d = check('breadcrumb (skips All Products)', render('schema-breadcrumb-enhanced.liquid', dict(base, product=product, collection=product['collections'][0])))
if d:
    assert d['itemListElement'][1]['name'] == 'Batoane Proteice', d
d = check('breadcrumb (no category)', render('schema-breadcrumb-enhanced.liquid', dict(base, product=product_no_reviews, collection=None)))
if d:
    assert len(d['itemListElement']) == 2
d = check('article (person author)', render('schema-article.liquid', dict(base, article=article, request={'page_type': 'article'})))
if d:
    assert d['author']['@type'] == 'Person' and d['author']['name'] == 'Marius Chera' and d['author']['jobTitle'] == 'Antrenor de culturism, fondator Prime Supplements'
    assert d['image']['width'] == 1200 and d['wordCount'] > 250 and '\n' not in d['headline']
    assert re.match(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$', d['datePublished']), d['datePublished']
d = check('article (organization author, no image)', render('schema-article.liquid', dict(base, article=article_org, request={'page_type': 'article'})))
if d:
    assert d['author']['@type'] == 'Organization' and 'image' not in d
d = check('collection', render('schema-collection.liquid', dict(base, collection=collection, request={'page_type': 'collection'})))
if d:
    g = d['@graph']; assert g[0]['@type'] == 'CollectionPage' and len(g[0]['mainEntity']['itemListElement']) == 2 and 'image' not in g[0]['mainEntity']['itemListElement'][1]
    assert g[1]['@type'] == 'BreadcrumbList'
d = check('collection (empty)', render('schema-collection.liquid', dict(base, collection=collection_empty, request={'page_type': 'collection'})))
if d:
    assert 'description' not in d['@graph'][0] and d['@graph'][0]['mainEntity']['itemListElement'] == []
d = check('organization (index: with WebSite)', render('schema-organization.liquid', dict(base, request={'page_type': 'index'})))
if d:
    assert len(d['@graph']) == 2 and d['@graph'][1]['@type'] == 'WebSite'
d = check('organization (product page: no WebSite)', render('schema-organization.liquid', dict(base, request={'page_type': 'product'})))
if d:
    assert len(d['@graph']) == 1
print('ALL RENDER TESTS DONE')
