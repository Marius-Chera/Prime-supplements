"""Shopify rich_text_field JSON <-> simple HTML helpers."""
import json, html, re

def rt_to_html(value):
    if not value: return ''
    try: root = json.loads(value)
    except Exception: return html.escape(value)
    def inline(nodes):
        out = []
        for n in nodes or []:
            t = n.get('type')
            if t == 'text':
                s = html.escape(n.get('value', '')).replace('\n', ' ').strip(' ') if False else html.escape(n.get('value', ''))
                if n.get('bold'): s = f'<strong>{s}</strong>'
                if n.get('italic'): s = f'<em>{s}</em>'
                out.append(s)
            elif t == 'link':
                out.append(f'<a href="{html.escape(n.get("url", ""))}">{inline(n.get("children"))}</a>')
            else:
                out.append(inline(n.get('children')))
        return ''.join(out)
    def block(n):
        t = n.get('type')
        if t == 'paragraph': return f'<p>{inline(n.get("children")).strip()}</p>'
        if t == 'heading': lv = n.get('level', 3); return f'<h{lv}>{inline(n.get("children")).strip()}</h{lv}>'
        if t == 'list':
            tag = 'ol' if n.get('listType') == 'ordered' else 'ul'
            return f'<{tag}>' + ''.join(f'<li>{inline(li.get("children")).strip()}</li>' for li in n.get('children', [])) + f'</{tag}>'
        return inline(n.get('children'))
    return '\n'.join(block(n) for n in root.get('children', []))

def blocks_to_rt(blocks):
    """blocks: list of {"p": str} | {"h": str, "level": 2|3} | {"ul": [str]} | {"ol": [str]}; inline **bold** and [text](/url) supported."""
    def inline(s):
        nodes = []
        pos = 0
        for m in re.finditer(r'\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)', s):
            if m.start() > pos: nodes.append({'type': 'text', 'value': s[pos:m.start()]})
            if m.group(1) is not None: nodes.append({'type': 'text', 'value': m.group(1), 'bold': True})
            else: nodes.append({'type': 'link', 'url': m.group(3), 'title': None, 'target': None, 'children': [{'type': 'text', 'value': m.group(2)}]})
            pos = m.end()
        if pos < len(s): nodes.append({'type': 'text', 'value': s[pos:]})
        return nodes or [{'type': 'text', 'value': ''}]
    children = []
    for b in blocks:
        if 'p' in b: children.append({'type': 'paragraph', 'children': inline(b['p'])})
        elif 'h' in b: children.append({'type': 'heading', 'level': int(b.get('level', 3)), 'children': inline(b['h'])})
        elif 'ul' in b or 'ol' in b:
            items = b.get('ul') or b.get('ol')
            children.append({'type': 'list', 'listType': 'unordered' if 'ul' in b else 'ordered', 'children': [{'type': 'list-item', 'children': inline(i)} for i in items]})
    return json.dumps({'type': 'root', 'children': children}, ensure_ascii=False)
