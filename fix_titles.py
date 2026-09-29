import json
from collections import defaultdict

with open('cakebites-react/src/customCakesData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Track how many times each base title has been seen
title_counts = defaultdict(int)
from collections import Counter
all_titles = [x.get('title', '') for x in data]
dupes = {t for t, c in Counter(all_titles).items() if c > 1}

print("Fixing duplicate titles...")
for item in data:
    title = item.get('title', '')
    if title in dupes:
        title_counts[title] += 1
        item['title'] = f"{title} Design #{title_counts[title]}"

# Verify fix
new_titles = [x.get('title', '') for x in data]
new_counts = Counter(new_titles)
new_dupes = {t: c for t, c in new_counts.items() if c > 1}
print(f"Remaining duplicates after fix: {len(new_dupes)}")
if new_dupes:
    for t, c in list(new_dupes.items())[:5]:
        print(f"  {c}x '{t}'")

# Write back
with open('cakebites-react/src/customCakesData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Done! Updated {sum(title_counts.values())} items.")
print("Sample new titles:")
for item in data[:5]:
    print(f"  {item['title']!r}")
