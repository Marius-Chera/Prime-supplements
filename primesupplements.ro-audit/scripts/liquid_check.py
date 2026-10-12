#!/usr/bin/env python3
"""Cheap structural check for Shopify Liquid files: balanced block tags and delimiters. Usage: liquid_check.py file..."""
import re, sys, json
PAIRS = {'if':'endif','unless':'endunless','for':'endfor','case':'endcase','capture':'endcapture','form':'endform','paginate':'endpaginate','schema':'endschema','style':'endstyle','javascript':'endjavascript','comment':'endcomment','raw':'endraw','tablerow':'endtablerow','stylesheet':'endstylesheet'}
ENDS = {v:k for k,v in PAIRS.items()}
ok = True
for path in sys.argv[1:]:
    s = open(path, encoding='utf-8').read()
    errs = []
    if path.endswith('.json'):
        body = re.sub(r'^\s*/\*.*?\*/\s*', '', s, count=1, flags=re.S)
        try: json.loads(body)
        except Exception as e: errs.append(f'invalid JSON: {e}')
        if s.lstrip().startswith('/*'): errs.append('JSON file still carries the auto-generated comment header (strip it before upload)')
    else:
        # delimiters
        if s.count('{{') != s.count('}}'): errs.append(f'unbalanced {{{{ }}}}: {s.count("{{")} vs {s.count("}}")}')
        if s.count('{%') != s.count('%}'): errs.append(f'unbalanced {{% %}}: {s.count("{%")} vs {s.count("%}")}')
        stack = []
        for m in re.finditer(r'\{%-?\s*(\w+)', s):
            tag = m.group(1)
            if tag in ('comment','raw'):
                pass
            if tag in PAIRS: stack.append((tag, m.start()))
            elif tag in ENDS:
                if not stack or stack[-1][0] != ENDS[tag]:
                    errs.append(f'{tag} at offset {m.start()} does not close {stack[-1][0] if stack else "anything"}'); 
                    if stack: stack.pop()
                else: stack.pop()
        for tag, pos in stack: errs.append(f'{tag} opened at offset {pos} never closed')
        # schema JSON validity
        sm = re.search(r'\{%-?\s*schema\s*-?%\}(.*?)\{%-?\s*endschema', s, re.S)
        if sm:
            try: json.loads(sm.group(1))
            except Exception as e: errs.append(f'invalid schema JSON: {e}')
    print(('OK   ' if not errs else 'FAIL ') + path)
    for e in errs: print('   -', e); ok = False
sys.exit(0 if ok else 1)
