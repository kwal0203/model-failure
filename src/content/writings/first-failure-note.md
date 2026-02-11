---
title: "Prompt Injection in Tool Selection"
date: 2026-02-10
description: "A short failure note on untrusted tool arguments and guardrail bypass patterns."
topics: ["agent-security", "prompt-injection"]
---

## What failed

A tool-selection policy accepted attacker-controlled arguments as trusted context.

## Why it failed

The orchestrator mixed user and system channels before policy evaluation.

## Minimal repro

Inject a high-priority instruction into a retrieved document and trigger tool execution.

## Fix / mitigation

Separate trust domains, apply allowlists for tool args, and enforce policy after composition.

## Notes

Keep repros defensive and minimal.
