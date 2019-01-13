import json
import requests


with open('t.json') as f:
    data = json.load(f)
    
deps = []
scores = []
for dep in data.keys():
    deps.append(dep)
    scores.append(data[dep])

response_json = []
# For each item in your original list
for item in data:
    response_json.append({"department" : item,
                     "score" : data[item]})
    
print (json.dumps(response_json,indent=2))
with open('formated_score.json', 'w') as outfile:
    json.dump(response_json, outfile)