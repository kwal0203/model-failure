---
title: "Agent Evaluation Harness Security Audit"
date: 2026-02-10
target_name: "Eval Harness"
target_link: "https://example.com/eval-harness"
target_version: "8d3f4c1"
scope: "Prompt routing, tool invocation, and trace logging"
severity_summary: { critical: 0, high: 1, medium: 2, low: 1 }
topics: ["rag-security", "agent-security"]
links: { repo: "https://github.com/example/eval-harness" }
---

## Threat model

Assume untrusted input from users and retrieved corpora.

## Attack surface

Prompt templates, tool wrappers, and output post-processing.

## Findings

### Finding 1 - Tool argument trust boundary violation

**Impact:** Unauthorized tool execution paths.

**Root cause:** Unvalidated argument merging.

**Repro:** Route attacker-controlled JSON into tool args.

**Fix:** Strict schema validation and policy checks.

**Regression test:** Add fixture-based malicious payload tests.

## Recommendations

Harden trust boundaries and fail closed on parse errors.

## Appendix

Additional logs and evidence references.
