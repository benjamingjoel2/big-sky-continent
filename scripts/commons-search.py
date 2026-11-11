"""Search Wikimedia Commons for freely licensed photos. Usage: commons-search.py queries.json out.json"""
import json, sys, time, re, html, urllib.parse, urllib.request, urllib.error
UA = 'BigSkyContinentBuild/1.0 (https://bigskycontinent.tourground.com; static site build)'
API = 'https://commons.wikimedia.org/w/api.php'
FREE = re.compile(r'^(CC BY(-SA)? [0-9.]+.*|CC0.*|Public domain.*)$', re.I)
PEOPLE = re.compile(r'\b(portrait|people|person|man|men|woman|women|girl|boy|child|children|tourists?|crowd|selfie|family)\b', re.I)
def get(p):
    url = API + '?' + urllib.parse.urlencode(dict(p, format='json', formatversion='2'))
    for i in range(8):
        time.sleep(2.5)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60) as r: return json.load(r)
        except urllib.error.HTTPError as e:
            w = int(e.headers.get('Retry-After') or 20) + 5; print('  http', e.code, 'wait', w, file=sys.stderr); time.sleep(w)
    raise SystemExit('api failed')
def strip(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()
qs = json.load(open(sys.argv[1])); out = {}
for key, queries in qs.items():
    res = []
    for q in queries:
        d = get({'action': 'query', 'generator': 'search', 'gsrsearch': q, 'gsrnamespace': 6, 'gsrlimit': 30,
                 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata|mime',
                 'iiextmetadatafilter': 'ImageDescription|LicenseShortName|Artist|LicenseUrl'})
        for p in (d.get('query') or {}).get('pages', []):
            ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata', {})
            if ii.get('mime') != 'image/jpeg': continue
            w, h = ii.get('width', 0), ii.get('height', 1)
            lic = strip(m.get('LicenseShortName', {}).get('value'))
            desc = strip(m.get('ImageDescription', {}).get('value'))[:200]
            if w < 1800 or not (1.3 <= w / h <= 2.2) or not FREE.match(lic): continue
            if PEOPLE.search(p['title'] + ' ' + desc): continue
            res.append({'file': p['title'], 'page': ii.get('descriptionurl'), 'author': strip(m.get('Artist', {}).get('value'))[:80],
                        'license': lic, 'license_url': strip(m.get('LicenseUrl', {}).get('value')), 'w': w, 'h': h, 'desc': desc, 'q': q})
    seen = set(); res = [r for r in res if not (r['file'] in seen or seen.add(r['file']))]
    out[key] = res[:12]
    print(key, len(res), file=sys.stderr)
json.dump(out, open(sys.argv[2], 'w'), indent=1, ensure_ascii=False)
