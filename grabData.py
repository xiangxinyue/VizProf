import urllib.request
from bs4 import BeautifulSoup
import re
import json

def getOneProf(url):
    html = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(html, "lxml")
    grade = soup.findAll("div", class_="grade")[0].text

    try:
        prof_name = ' '.join(soup.findAll("h1", class_="profname")[0].text.split())
        tags = soup.findAll("div", class_="tag-box")[0].text
        tags = soup.findAll("div", class_="tag-box")[0].text
        tags_list = tags.splitlines()
        tags_temp_list = []
        the_tags = []
        dic = []
        for tag in tags_list[1:-1]:
            tags_temp_list.append(tag.split('('))
        for tag in tags_temp_list:
            vote = tag[1][:-1]
            the_tags.append([tag[0], int(vote)])

        prof = {
            'name': prof_name,
            'grade': float(grade),
            'tag': the_tags
        }

        return json.dumps(prof, indent=4)

    except:
        pass


def get_prof_ids():
    with open('data.json', encoding='utf-8') as data_file:
        data = json.loads(data_file.read())
        # cs_profs_ids = []
        ids = []
        for e in data:
            # if e['tDept'] == "Computer Science":
                # cs_profs_ids.append(e['tid'])
            ids.append(e['tid'])
    # return cs_profs_ids
    return ids


with open('all_prof_tags_data.json', 'w') as outfile:
    ids = get_prof_ids()
    l = len(ids)
    n = 0
    for id in get_prof_ids():
        url = 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + str(id) + '&showMyProfs=true'
        # print(getOneProf(url))
        n += 1
        if getOneProf(url) != None:
            outfile.write(getOneProf(url))
        process = "{:0.2f}".format(n/l * 100) + '%'
        print(process)
