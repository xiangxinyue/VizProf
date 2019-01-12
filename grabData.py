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
        cs_profs_ids = []
        for e in data:
            if e['tDept'] == "Computer Science":
                cs_profs_ids.append(e['tid'])
    return cs_profs_ids


with open('cs_prof_tags_data.json', 'w') as outfile:
    for id in get_prof_ids():
        url = 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + str(id) + '&showMyProfs=true'
        # print(getOneProf(url))
        i = 0
        if getOneProf(url) != None:
            outfile.write(getOneProf(url))
