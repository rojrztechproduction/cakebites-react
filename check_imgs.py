import json

with open('cakebites-react/src/customCakesData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Total items:", len(data))

no_img = [x for x in data if not x.get('img')]
has_img = [x for x in data if x.get('img')]
print("No img:", len(no_img))
print("Has img:", len(has_img))

print("\nFirst 10 items:")
for item in data[:10]:
    title = item.get('title', '')
    img = item.get('img', '')
    print(f"  title={title!r} | img={img!r}")

if has_img:
    print("\nSample img URLs (first 5 with img):")
    for item in has_img[:5]:
        print(f"  {item.get('img', '')}")
