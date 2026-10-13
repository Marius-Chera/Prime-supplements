"""check.py <vars.json> <response.json>: the stored description must equal the intended one after whitespace normalisation, and the first 500 characters of its text must hold no line break (the live JSON-LD snippet uses them)."""
import json, sys, re, html
want = json.load(open(sys.argv[1]))['product']['descriptionHtml']
r = json.load(open(sys.argv[2]))
def find(o):
    if isinstance(o, dict):
        if 'descriptionHtml' in o: return o
        for v in o.values():
            x = find(v)
            if x: return x
    if isinstance(o, list):
        for v in o:
            x = find(v)
            if x: return x
p = find(r) or {}
got = p.get('descriptionHtml', '')
norm = lambda s: re.sub(r'\s+', ' ', re.sub(r'>\s+<', '><', s.replace(' ', ' '))).strip()
text = html.unescape(re.sub(r'<[^>]+>', '', got))[:500]
ok = norm(want) == norm(got) and '\n' not in text
print(json.dumps({'handle': p.get('handle'), 'equal': norm(want) == norm(got), 'newline_in_first_500': '\n' in text, 'ok': ok}))
sys.exit(0 if ok else 1)
