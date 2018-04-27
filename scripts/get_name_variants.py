import sys 
import pandas as pd 

professor_name = sys.argv[1]  

df_professor   = pd.read_csv(professor_name)   
new_names      = []
for index, row in df_professor.iterrows():
	prof  = row['professor names']
	netid = row['netid']
	if ',' in prof: 
		comma_index = prof.find(', ')
		prof        = prof[:comma_index]
	if '.' in prof: 
		prof = prof.split('. ')
		new_names.append(prof[-1] + ', ' + prof[0])
	else: 
		prof = prof.split(' ')
		if len(prof) == 3: 
			new_names.append(prof[-1] + ', ' + prof[0] + ' ' + prof[1][0])
		else:	
			new_names.append(prof[-1] + ', ' + prof[0])

name_series = pd.Series(new_names)
df_professor['name 1'] = name_series

df_professor.to_csv('prof_name_netid_translatednames.csv', mode = 'wb', index = False)