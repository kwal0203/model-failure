---
title: "Review: Adversarial Tool Calling in LLM Agents"
date: 2026-02-10
paper_authors: ["J. Doe", "R. Smith"]
year: 2025
venue: "arXiv"
topics: ["agent-security", "tool-use"]
links: { arxiv: "https://arxiv.org/abs/2502.00002" }
reproduced: false
---

## Problem

Agent tool routing can be hijacked via indirect prompt injection.

## Key idea

Use policy-constrained planners and strict argument schemas.

## Method

Red-team datasets with staged adversarial retrieval contexts.

## Results

Shows reduced exploit success under constrained orchestration.

## Failure modes / limitations

Some bypasses persist under long-chain context attacks.

## Security takeaways

Trust boundaries and strict parsers are non-optional.

## Repro notes

Reproduction pending due to unavailable training artifacts.

## How I'd extend it

Add cross-tool contamination benchmarks and patch-level ablations.
