---
title: 'Sample Retrieval Guardrail Audit'
date: '2026-02-10'
target_name: 'Example RAG Service'
target_link: 'https://example.com'
target_version: 'v0.1.0'
scope: 'Prompt injection resistance in retrieval + tool routing.'
severity_summary: { critical: 0, high: 1, medium: 2, low: 1 }
topics: ['rag-security', 'prompt-injection']
links: { repo: 'https://github.com/example/repo' }
---

## Threat model

Untrusted corpus content and user-controlled prompts.

## Attack surface

Retriever, system prompt stitching, and action routing.

## Findings

### Finding 1 - Tool escalation through retrieved instructions

**Impact:** unauthorized actions.
**Root cause:** missing instruction/data separation.
**Repro:** inject a tool-call string into a top-ranked document.
**Fix:** enforce signed tool intents and strip action-like text.
**Regression test:** fixture-based replay with known payloads.

## Recommendations

Prioritize parser hardening and structured action channels.

## Appendix

Sample payloads omitted for safety.
