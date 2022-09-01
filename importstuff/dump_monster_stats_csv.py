import csv
import mwparserfromhell
import requests

output_file = './importstuff/wiki_monster_data.csv'

template_name = 'Infobox Monster'

wanted_params = [
    'version','name','image','id','combat','size','attributes',
    'hitpoints','att','str','def','mage','range',
    'attbns','strbns','amagic','mbns','arange','rngbns',
    'dstab','dslash','dcrush','dmagic','drange',
]

API_URL = 'https://oldschool.runescape.wiki/api.php'

def query(params):
    res = requests.get(API_URL, params=params)
    return res

def transcludedin(titles, namespace='0'):
    print('transcludedin query:','0')
    params = {
        "action": "query",
        "format": "json",
        "prop": "transcludedin",
        "tilimit": "max",
        "tiprop": "pageid",
        "titles": titles,
        "tinamespace": namespace,
    }
    res = query(params).json()
    page_output = list(res["query"]["pages"].values())[0]
    if "transcludedin" not in page_output:
        return []
    output = page_output["transcludedin"]
    while "continue" in res:
        params["ticontinue"] = res["continue"]["ticontinue"]
        res = query(params).json()
        pages = res["query"]["pages"]
        new_output = list(pages.values())[0]["transcludedin"]
        output.extend(new_output)

        print('transcludedin query:',len(output))

    return output

def revisions(ids):
    params = {
        "action": "query",
        "prop": "revisions",
        "rvprop": "content|ids",
        "format": "json",
        "pageids": ids
    }
    return query(params).json()

print('Scraping data for Template:' + template_name + '...')

pages_with_template = transcludedin('Template:' + template_name)

page_ids = [str(i["pageid"]) for i in pages_with_template]

print('Page count: ', len(page_ids))

def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

BATCH_SIZE = 50
pages = []
for i, chunk in enumerate(chunks(page_ids, BATCH_SIZE)):
    print('Page query:',i*BATCH_SIZE)
    ids = '|'.join(chunk)
    cur_pages = revisions(ids)["query"]["pages"]
    for key, val in cur_pages.items():
        try:
            interesting_info = {
                "title": val['title'],
                "text": val['revisions'][0]['*'],
            }
            pages.append(interesting_info)
        except Exception as e:
            print(str(e))
            continue

print('Done loading pages')
print('Parsing params from ' + str(len(pages)) + ' pages...')
all_params = ['article', 'version_number'] + wanted_params
data_to_write = [all_params]
versions = [''] + [str(i) for i in range(1,50)]
for page in pages:
    title = page["title"]
    text = page["text"]
    if ':' in title:
        continue

    mwtext = mwparserfromhell.parse(text)
    templates = mwtext.filter_templates(matches=lambda t: t.name.matches(template_name))
    for t in templates:
        for version in versions:
            id_param = 'id' + version
            if not t.has(id_param):
                continue

            results = []

            for param_name in wanted_params:
                val = ''
                if t.has(param_name + version):
                    val = t.get(param_name + version).value.strip()
                elif t.has(param_name):
                    val = t.get(param_name).value.strip()
                results.append(val)

            data_to_write.append([title, version] + results)


print('Printing to '+output_file)
with open(output_file, 'w') as f:
    csv_writer = csv.writer(f)
    for data_line in data_to_write:
        csv_writer.writerow(data_line)

print('Done')