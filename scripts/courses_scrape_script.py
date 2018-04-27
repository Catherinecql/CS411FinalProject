import webbrowser
import numpy as np
import pandas as pd
from selenium import webdriver



driver = webdriver.Firefox()
url = 'https://courses.illinois.edu/schedule/2018/fall/CS'
driver.get(url)


course_codes = [] #getting course codes
for i in range(1, 69):
    curr_code = driver.find_element_by_css_selector('tr:nth-child('+str(i)+') > td:nth-child(1)').text      
    course_codes.append(curr_code)

course_names = [] #getting course names (titles)
for j in range (1, 69):
    curr_name = driver.find_element_by_css_selector('tr:nth-child('+str(j)+') > td:nth-child(2) > a:nth-child(1)').text      
    course_names.append(curr_name)

course_info = []
for k in range(68): #getting professor names & combining it all
    curr_profs = []
    
    # click on course title
    xpath = '//a[@href="/schedule/2018/fall/CS/' + course_codes[k][3:] + '"]'
    title_button = driver.find_element_by_xpath(xpath)
    title_button.click()
    
    table_info = driver.find_element_by_css_selector('#section-dt_info').text
    num_profs = (int)(table_info.split(" ")[0]) #getting number of professor records to read
    
    curr_profs = driver.find_element_by_tag_name('td.instructor').text

    str_array = np.array(curr_profs)
    for u in range(len(str_array)):
        str_array[u] = str_array[u].replace('\n', '; ') #cleaning

    uniques = np.unique(str_array)
    uniques_string = ''.join(uniques)
    
    info = [] #making a list of lists here
    info.append(course_codes[k])
    info.append(course_names[k])
    info.append(uniques_string)
    
    course_info.append(info)
        
    # click back
    back_button = driver.find_element_by_css_selector('.breadcrumb > li:nth-child(4) > a:nth-child(1)')
    back_button.click()

for c in range(68):
    print(course_info[c])
    
# create a dataframe with course_info
course_info_df = pd.DataFrame(course_info, columns=['course code', 'title', 'instructors'])
#write the df into a csv file
course_info_df.to_csv('course_catalog_info.csv', mode='wb', index=False)

driver.quit()