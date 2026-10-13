"""Apply a list of edits [{file, old, new, anchor}] to S/psi/stg.
Missing files are first copied from theme-work into both orig/ and stg/ (orig = pre-change baseline).
- old non-empty: exact single replacement (fails if not exactly one match)
- old empty + anchor: insert new right after the first occurrence of anchor (anchor must be unique)
Usage: python3 apply_edits.py edits.json [--dry]"""
import json, os, shutil, sys
S = '/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad'
STG, ORIG, TW = f'{S}/psi/stg', f'{S}/psi/orig', f'{S}/theme-work'
edits = json.load(open(sys.argv[1]))
dry = '--dry' in sys.argv
for e in edits:
    f = e['file']
    p = f'{STG}/{f}'
    if not os.path.exists(p):
        src = f'{TW}/{f}'
        if not os.path.exists(src):
            sys.exit(f'missing source for {f}')
        os.makedirs(os.path.dirname(p), exist_ok=True); os.makedirs(os.path.dirname(f'{ORIG}/{f}'), exist_ok=True)
        if not dry:
            shutil.copy(src, p); shutil.copy(src, f'{ORIG}/{f}')
        print('copied baseline', f)
    t = open(p if os.path.exists(p) else f'{TW}/{f}', encoding='utf-8').read()
    old, new, anchor = e.get('old') or '', e['new'], e.get('anchor') or ''
    if old:
        n = t.count(old)
        if n != 1: sys.exit(f'{f}: old text found {n} times: {old[:120]!r}')
        t = t.replace(old, new)
    else:
        n = t.count(anchor)
        if not anchor or n != 1: sys.exit(f'{f}: anchor found {n} times: {anchor[:120]!r}')
        i = t.index(anchor) + len(anchor)
        t = t[:i] + new + t[i:]
    if not dry:
        open(p, 'w', encoding='utf-8').write(t)
    print('ok', f, e.get('description', '')[:80])
