"""Download chosen Commons files at 1920px and write src/data/photos.json. Usage: commons-fetch.py picks.json"""
import json, sys, time, re, html, urllib.parse, urllib.request, urllib.error
UA = 'BigSkyContinentBuild/1.0 (https://bigskycontinent.tourground.com; static site build)'
API = 'https://commons.wikimedia.org/w/api.php'
def req(url):
    for i in range(8):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=120) as r: return r.read()
        except urllib.error.HTTPError as e:
            w = int(e.headers.get('Retry-After') or 20) + 5; print('  http', e.code, 'wait', w, file=sys.stderr); time.sleep(w)
    raise SystemExit('failed ' + url)
def strip(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()
picks = json.load(open(sys.argv[1]))
out = json.load(open('src/data/photos.json'))
for key, p in picks.items():
    q = urllib.parse.urlencode({'action': 'query', 'titles': p['file'], 'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': 1920,
        'iiextmetadatafilter': 'ImageDescription|LicenseShortName|Artist|LicenseUrl', 'format': 'json', 'formatversion': 2})
    time.sleep(3)
    ii = json.loads(req(API + '?' + q))['query']['pages'][0]['imageinfo'][0]; m = ii['extmetadata']
    time.sleep(2)
    open(f'src/assets/photos/{key}.jpg', 'wb').write(req(ii['thumburl']))
    out[key] = {'file': p['file'], 'page': ii['descriptionurl'], 'author': strip(m['Artist']['value'])[:120],
                'license': strip(m['LicenseShortName']['value']), 'license_url': strip(m.get('LicenseUrl', {}).get('value', '')),
                'caption': p['caption']}
    print(key, '|', strip(m.get('ImageDescription', {}).get('value', ''))[:200], flush=True)
json.dump(out, open('src/data/photos.json', 'w'), indent=1, ensure_ascii=False)
