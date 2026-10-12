# Prime Supplements

## Claude SEO

This repository enables the [Claude SEO](https://github.com/AgriciDaniel/claude-seo) plugin for Claude Code through `.claude/settings.json`. Opening the project in Claude Code registers the `agricidaniel-claude-seo` marketplace and enables the `claude-seo` plugin automatically (Claude Code 1.0.33 or newer; you may be prompted once to approve the project settings).

One-time setup on each machine, inside Claude Code:

```
/seo setup
/seo doctor
```

`/seo setup` creates an isolated Python environment (Python 3.10 or newer required) and installs Playwright Chromium for SPA rendering and screenshots. `/seo doctor` checks the runtime without changing anything.

Common commands:

```
/seo audit https://example.com
/seo page https://example.com/about
/seo schema https://example.com
/seo geo https://example.com
```

Full command reference: [docs/COMMANDS.md](https://github.com/AgriciDaniel/claude-seo/blob/main/docs/COMMANDS.md).
