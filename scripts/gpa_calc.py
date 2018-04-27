import sys
import os
import csv
import numpy as np
import pandas as pd
import base64

classes_csv      = sys.argv[1]                        # read in the professor name csv
df_classes       = pd.read_csv(classes_csv)
prof_handled = []
final_gpa_list   = []
for index, row in df_classes.iterrows():
	prof          = row['Primary Instructor']
	if type(prof) == type('hello'):
		course_no     = row['Number']
		year_term  = row['YearTerm']
		if (prof,course_no,year_term) not in prof_handled:
			prof_handled.append((prof,course_no,year_term))
			match_classes = df_classes[df_classes['Primary Instructor'] == prof][df_classes['Number'] == course_no][df_classes['YearTerm'] == year_term]
			a_plus_t     = 0
			a_flat_t     = 0
			a_minus_t    = 0
			b_plus_t     = 0
			b_flat_t     = 0
			b_minus_t    = 0
			c_plus_t     = 0
			c_flat_t     = 0
			c_minus_t    = 0
			d_plus_t     = 0
			d_flat_t     = 0
			d_minus_t    = 0
			f_flat_t     = 0
			withdrawls_t = 0
			total = 0
			for index_t, row_t in match_classes.iterrows(): 
				subject    = row_t['Subject']
				course_no  = row_t['Number']

				a_plus     = row_t['A+']
				a_flat     = row_t['A']
				a_minus    = row_t['A-']
				b_plus     = row_t['B+']
				b_flat     = row_t['B']
				b_minus    = row_t['B-']
				c_plus     = row_t['C+']
				c_flat     = row_t['C']
				c_minus    = row_t['C-']
				d_plus     = row_t['D+']
				d_flat     = row_t['D']
				d_minus    = row_t['D-']
				f_flat     = row_t['F']

				a_plus_t  += row_t['A+']
				a_flat_t  += row_t['A']
				a_minus_t += row_t['A-']
				b_plus_t  += row_t['B+']
				b_flat_t  += row_t['B']
				b_minus_t += row_t['B-']
				c_plus_t  += row_t['C+']
				c_flat_t  += row_t['C']
				c_minus_t += row_t['C-']
				d_plus_t  += row_t['D+']
				d_flat_t  += row_t['D']
				d_minus_t += row_t['D-']
				f_flat_t  += row_t['F']
				withdrawls_t += row_t['W']
				total += a_plus + a_flat + a_minus + b_plus + b_flat + b_minus + c_plus + c_flat + c_minus + d_plus + d_flat + d_minus + f_flat


			if total == 0: 
				print(str(year_term) + ' ' + str(course_no) + ' ' + str(type(prof)))
			gpa   = "{0:.2f}".format((a_plus_t * 4.00 + a_flat_t * 4.00 + a_minus_t * 3.67 + b_plus_t * 3.33 + b_flat_t * 3.0 + b_minus_t * 2.67 + 
						c_plus_t * 2.33 + c_flat_t * 2.00 + c_minus_t * 1.67 + d_plus_t * 1.33 + d_flat_t * 1.0 + d_minus_t * 0.67 + f_flat_t * 0.0)/ total)
			final_gpa_list.append([year_term, subject, course_no, prof, gpa, withdrawls_t, (total + withdrawls_t)])

final_df = pd.DataFrame(data = final_gpa_list, columns = ['yearterm', 'subject', 'course number', 'professor', 'gpa', 'withdrawls', 'total students'])
final_df.to_csv("class_data_gpa.csv", mode = 'wb', index = False)



	 