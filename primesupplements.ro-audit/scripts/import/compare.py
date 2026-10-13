"""compare.py <vars.json> <response.json>: compare a saved articleUpdate response body with the intended body."""
import json, sys, re, hashlib
want = json.load(open(sys.argv[1]))['article']['body']
resp = json.load(open(sys.argv[2]))
def find(o):
    if isinstance(o, dict):
        if 'body' in o and isinstance(o['body'], str): return o
        for v in o.values():
            r = find(v)
            if r: return r
    if isinstance(o, list):
        for v in o:
            r = find(v)
            if r: return r
art = find(resp) or {}
got = art.get('body', '')
norm = lambda s: re.sub(r'[ \t]+', ' ', re.sub(r'>\s+<', '><', s.replace('\r\n', '\n').replace('\u00a0', ' ').replace('&nbsp;', ' '))).strip()
lead = lambda s: re.sub(r'^(?:\s*</[a-zA-Z0-9]+>)+', '', s)
h = lambda s: hashlib.sha256(s.encode()).hexdigest()
exact = h(want.replace('\r\n', '\n')) == h(got.replace('\r\n', '\n'))
same = h(norm(lead(want))) == h(norm(lead(got)))
errs = (resp.get('data') or {}).get('articleUpdate', {}).get('userErrors') if isinstance(resp.get('data'), dict) else None
print(json.dumps({'id': art.get('id'), 'exact': exact, 'normalised_equal': same, 'userErrors': errs, 'want_len': len(want), 'got_len': len(got)}))
sys.exit(0 if same else 1)
