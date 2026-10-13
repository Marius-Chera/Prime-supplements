"""Heading repair for BlogGenAuto bodies: an <hN> met while an <hN> is open closes it; a </hN> with no open <hN> is dropped."""
import re
TAG = re.compile(r'<(/?)(h[1-6])(\s[^>]*)?>', re.I)
def fix_tokens(b):
    out, stack, pos, conv, dropped = [], [], 0, 0, 0
    for m in TAG.finditer(b):
        out.append(b[pos:m.start()]); pos = m.end()
        close, lvl = m.group(1) == '/', m.group(2).lower()
        if not close:
            if stack and stack[-1] == lvl:
                out.append(f'</{lvl}>'); stack.pop(); conv += 1
            else:
                out.append(m.group(0)); stack.append(lvl)
        else:
            if stack and stack[-1] == lvl:
                out.append(m.group(0)); stack.pop()
            elif lvl in stack:
                while stack[-1] != lvl: out.append(f'</{stack.pop()}>')
                out.append(m.group(0)); stack.pop()
            else:
                dropped += 1
    out.append(b[pos:])
    return ''.join(out), conv, dropped, len(stack)
