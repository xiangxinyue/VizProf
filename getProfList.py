import requests
import json
import math

# reference : https://github.com/Rodantny/Rate-My-Professor-Scraper-and-Search

def getProfList(uni_id):
    # get number of professors in the university
    l = []
    page = requests.get(
    "http://www.ratemyprofessors.com/filter/professor/?&page=1&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=" + str(
            uni_id))  # get request for page
    temp_jsonpage = json.loads(page.content)
    num_of_prof = temp_jsonpage['remaining'] + 20  # get the number of professors at William Paterson University
    
    
    num_of_pages = math.ceil(num_of_prof / 20)
    i = 1
    while (i <= num_of_pages):# the loop insert all professor into list
        page = requests.get("http://www.ratemyprofessors.com/filter/professor/?&page=" + str(
            i) + "&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=" + str(
            uni_id))
        temp_jsonpage = json.loads(page.content)
        temp_list = temp_jsonpage['professors']
        l.extend(temp_list)
        i += 1
    return l

my_list = getProfList(1407)
with open('data.json', 'w') as outfile:
    json.dump(my_list, outfile)
