export const meta = {
  name: 'primesupplements-import-article-bodies',
  description: 'Import the repaired, validated bodies of the 121 kept blog articles into the live store primesupplements.ro (body only), with read-back verification',
  phases: [{ title: 'Import', detail: 'one agent per group of 6 articles' }],
}
const DIR = args.varsDir, LOG = args.logDir, GROUPS = args.groups, CMP = args.compareScript
const RESULT = { type: 'object', properties: { applied: { type: 'number' }, failed: { type: 'number' }, failures: { type: 'array', items: { type: 'object', properties: { handle: { type: 'string' }, error: { type: 'string' } }, required: ['handle', 'error'] } } }, required: ['applied', 'failed'] }
const prompt = (g, n) => `You import reviewed, validated article bodies into the LIVE Shopify store primesupplements.ro. The store owner explicitly authorised all SEO fixes in this session; these bodies were cleaned, repaired, reviewed and validated before reaching you. Change nothing else. Load the tool with ToolSearch "select:mcp__Shopify__graphql_mutation".
Your group (${g.length} articles, by current handle): ${JSON.stringify(g)}.
For each handle H, the exact variables are in ${DIR}/H.json as {"id": "<Article GID>", "article": {"body": "<html>"}}. Print the file with: python3 -I -c "import json,sys;print(json.dumps(json.load(open(sys.argv[1])),ensure_ascii=True))" ${DIR}/H.json — and pass that JSON, unchanged, as the variables of mcp__Shopify__graphql_mutation with this mutation:
mutation ImportBody($id: ID!, $article: ArticleUpdateInput!) { articleUpdate(id: $id, article: $article) { article { id handle body } userErrors { field message } } }
Do not retype or edit the body: copy the printed JSON exactly (ASCII-escaped, so diacritics cannot be mistyped). One call per article, in order.
After each call, save the raw tool response to ${LOG}/resp-H.json with the Write tool (verbatim) and run: python3 -I ${CMP} ${DIR}/H.json ${LOG}/resp-H.json. It prints exact/normalised_equal; Shopify inserts newlines between tags, so "normalised_equal": true is success even when "exact" is false. If userErrors is non-empty or normalised_equal is false, retry the mutation once (re-print the file first); if it still fails, record the failure and continue. If a tool call errors (rate limit/network), wait 10 s and retry once.
Never run any other mutation. Finally write ${LOG}/import-${n}.json as {"applied": [handles], "failures": [{handle, error}]} and return the counts.`
phase('Import')
const res = (await parallel(GROUPS.map((g, i) => () => agent(prompt(g, i + 1), { label: `import:${i + 1}`, phase: 'Import', schema: RESULT })))).filter(Boolean)
return { applied: res.reduce((a, r) => a + r.applied, 0), failed: res.reduce((a, r) => a + r.failed, 0), failures: res.flatMap(r => r.failures || []) }
