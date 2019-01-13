import requests
import json
import math

# reference : https://github.com/Rodantny/Rate-My-Professor-Scraper-and-Search/blob/master/RMPClass.py#L24

def getProfList(uni_id):
    # get number of professors in the university
    l = []
    page = requests.get(
    "http://www.ratemyprofessors.com/filter/professor/?&page=1&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=" + str(
            uni_id))  # get request for page
    temp_jsonpage = json.loads(page.content)
    num_of_prof = temp_jsonpage['remaining'] + 20  # get the number of professors 
    
    
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
# write professor list to json file
with open('data.json', 'w') as outfile:
    json.dump(my_list, outfile)
  
# get list of departments   
dep_req = requests.get('https://www.ratemyprofessors.com/teacher/getDepartmentListFromSchool?sid=1407')
json_dep = json.loads(dep_req.content)
    
# calcualate average score for each department    
dep_Dict = {}    
for dep_name in json_dep['departments']:
    total = 0
    count = 0
    for i in my_list:
        if i['tDept'] == dep_name['name']:            
            if i['overall_rating'] != 'N/A':        
                total += float(i['overall_rating'])
                count += 1    
    if count == 0:
        continue
    dep_avg_score = total / count
    dep_Dict[dep_name['name']] = dep_avg_score
    

with open('avg_score_by_dep.json', 'w') as outfile:
    json.dump(dep_Dict, outfile)     
    
# simple visualization in matplotlib                
import matplotlib.pyplot as plt
D = dep_Dict
plt.bar(range(len(D)), list(D.values()), align='center')
plt.xticks(range(len(D)), list(D.keys()), rotation=80)