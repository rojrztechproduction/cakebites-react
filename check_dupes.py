import json

with open('cakebites-react/src/customCakesData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

from collections import Counter
titles = [x.get('title', '') for x in data]
counts = Counter(titles)

# Find duplicates
dupes = {t: c for t, c in counts.items() if c > 1}
print("Duplicate titles:")
for t, c in sorted(dupes.items(), key=lambda x: -x[1])[:20]:
    print(f"  {c}x  '{t}'")

print(f"\nTotal unique titles: {len(counts)}")
print(f"Total items: {len(data)}")
print(f"Duplicated items: {sum(c for c in counts.values() if c > 1)}")
