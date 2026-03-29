#!/usr/bin/env python3
"""
Тестер путей для «Последний Атеист».
Парсит все JS-скрипты, строит граф лейблов, проверяет:
1. Все 20 концовок достижимы
2. Нет мёртвых лейблов (без входящих ссылок)
3. Нет битых ссылок (jump на несуществующий лейбл)
"""

import re
import sys
from pathlib import Path
from collections import defaultdict

PROJECT = Path(__file__).parent
JS_DIR = PROJECT / "js"

# Все 20 концовок
EXPECTED_ENDINGS = [
    # A: Ранние выходы
    'Ending_Loophole',
    'Ending_DemonFriend',
    'Ending_Glitch',
    'Ending_DebateWin',
    # B: Верующий
    'Ending_Believer',
    'Ending_Pascal',
    'Ending_Theologian',
    # C: Бунт
    'Ending_Rebellion',
    'Ending_Hacker',
    'Ending_Democracy',
    # D: Бар
    'Ending_Bar',
    'Ending_Franchise',
    'Ending_Therapist',
    # E: Матрица
    'Ending_Matrix',
    'Ending_Speedrun',
    'Ending_Awakening',
    # F: Секретные
    'Ending_FullCircle',
    'Ending_DevCommentary',
    'Ending_Nihilist',
    'Ending_Prophet',
    # G: Романтика
    'Ending_HellRomance',
    'Ending_EscapeTogether',
]


def parse_labels_and_jumps(js_files):
    """Parse all JS files, extract labels and jump targets."""
    labels = {}  # label -> file
    jumps = defaultdict(set)  # label -> set of targets
    all_targets = set()

    for js_file in js_files:
        content = js_file.read_text(encoding='utf-8')

        # Find all label definitions: 'LabelName': [
        for match in re.finditer(r"'([A-Za-z_][A-Za-z0-9_]*)':\s*\[", content):
            label = match.group(1)
            labels[label] = js_file.name

        # Find ALL occurrences of "jump SomeLabel" anywhere in the file
        for match in re.finditer(r"jump\s+([A-Za-z_][A-Za-z0-9_]*)", content):
            target = match.group(1)
            all_targets.add(target)

    # Build edges: for each label, find which labels it jumps to
    for js_file in js_files:
        content = js_file.read_text(encoding='utf-8')
        # Find all label start positions
        label_starts = [(m.start(), m.group(1))
                        for m in re.finditer(r"'([A-Za-z_][A-Za-z0-9_]*)':\s*\[", content)]

        for idx, (pos, label_name) in enumerate(label_starts):
            # Block extends from this label to the next label (or EOF)
            next_pos = label_starts[idx + 1][0] if idx + 1 < len(label_starts) else len(content)
            block = content[pos:next_pos]

            for match in re.finditer(r"jump\s+([A-Za-z_][A-Za-z0-9_]*)", block):
                jumps[label_name].add(match.group(1))

    return labels, jumps, all_targets


def find_reachable(start, jumps):
    """BFS to find all reachable labels from start."""
    visited = set()
    queue = [start]
    while queue:
        current = queue.pop(0)
        if current in visited:
            continue
        visited.add(current)
        for target in jumps.get(current, set()):
            if target not in visited:
                queue.append(target)
    return visited


def main():
    js_files = list(JS_DIR.rglob("*.js"))
    print(f"Scanning {len(js_files)} JS files...\n")

    labels, jumps, all_targets = parse_labels_and_jumps(js_files)

    print(f"Labels found: {len(labels)}")
    print(f"Jump targets found: {len(all_targets)}")

    # Check broken links
    print("\n=== BROKEN LINKS (jump to non-existent label) ===")
    broken = all_targets - set(labels.keys())
    if broken:
        for b in sorted(broken):
            print(f"  ✗ '{b}' is referenced but never defined!")
        print(f"\n  {len(broken)} broken link(s) found!")
    else:
        print("  ✓ All jump targets are valid")

    # Check reachability from Start
    print("\n=== REACHABILITY FROM 'Start' ===")
    reachable = find_reachable('Start', jumps)
    unreachable = set(labels.keys()) - reachable
    # Filter out utility labels
    unreachable = {u for u in unreachable if not u.startswith('_')}
    if unreachable:
        print(f"  Unreachable labels ({len(unreachable)}):")
        for u in sorted(unreachable):
            print(f"    ? '{u}' in {labels[u]}")
    else:
        print("  ✓ All labels reachable from Start")

    # Check 20 endings
    print("\n=== ENDINGS CHECK (target: 20) ===")
    found = 0
    missing = []
    for ending in EXPECTED_ENDINGS:
        if ending in labels:
            if ending in reachable:
                print(f"  ✓ {ending}")
                found += 1
            else:
                print(f"  ⚠ {ending} — exists but NOT reachable from Start")
                missing.append(ending)
        else:
            print(f"  ✗ {ending} — NOT FOUND in any script!")
            missing.append(ending)

    print(f"\n  Result: {found}/{len(EXPECTED_ENDINGS)} endings verified")

    if missing:
        print(f"  Missing/unreachable: {missing}")

    # Summary
    print("\n=== LABEL MAP ===")
    for label in sorted(labels.keys()):
        targets = jumps.get(label, set())
        file = labels[label]
        if targets:
            print(f"  {label} ({file}) → {', '.join(sorted(targets))}")
        else:
            print(f"  {label} ({file}) → [end/no jumps]")

    # Return exit code
    if broken or missing:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
