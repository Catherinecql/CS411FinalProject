import sys
import linecache
import os
import csv
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import re
from time import sleep 
import numpy as np
import pandas as pd
import base64

professor_name = sys.argv[1]                        # read in the professor name csv
input_index    = sys.argv[2]
df_professor   = pd.read_csv(professor_name)        # create a dataframe with the csv file
directory_url  = 'https://directory.illinois.edu/search'
rmp_url        = 'http://www.ratemyprofessors.com/' # url for the website


reviewed_list = []                                   # holds netids of professors who have been scraped
driver        = webdriver.Firefox()                  # initialize the webdriver
for index, row in df_professor.iterrows():           # iterate through df_professor
    prof_name   = str(row['professor'])              # insert name into the list
    if int(input_index) > index: 
        reviewed_list.append(prof_name)
    else: 
        if prof_name not in reviewed_list: 
            prof_review = []                                 # list of [name,link]        
            prof_review.append(prof_name) 

            if re.match("^(([a-zA-Z]*)(\W)\s([a-zA-Z]*)\s([a-zA-Z]))$",prof_name):
                prof_name = prof_name[:-2]
            driver.get(rmp_url)
            try: # check for pop-up
                special_notice = driver.find_element_by_css_selector('#cookie_notice > a:nth-child(3)')
                special_notice.click()
            except NoSuchElementException: 
                print('No pop-up')

            # click on "find a professor"
            find_prof_button = driver.find_element_by_id('findProfessorOption')
            find_prof_button.click()
            
            # type our school name
            find_your_school = driver.find_element_by_css_selector('.optional-flag > div:nth-child(2)')
            find_your_school.send_keys('University Of Illinois at Urbana-Champaign')
            # wait 5 seconds
            sleep(3)
            # confirm with down-arrow and enter
            find_your_school.send_keys(u'\ue015')
            find_your_school.send_keys(u'\ue007')
            
            #wait for previous commands to be sent
            sleep(2)
            
            # send professor's name 
            find_your_prof   = driver.find_element_by_css_selector('#searchProfessorName')
            find_your_prof.send_keys(prof_name)

            # submit the page
            submit_button = driver.find_element_by_id('prof-name-btn')
            submit_button.click()
            sleep(3)

            # look for professor's page link
            reviews_on_page = re.findall(r'href="/ShowRatings?([^\'" >]+)',driver.page_source.encode("utf-8"))
            
            # if the professor has reviews, then create a full link and then append it to prof_review
            if reviews_on_page:
                for i in range(0,len(reviews_on_page)): 
                    prof_review.append('http://www.ratemyprofessors.com/ShowRatings' + reviews_on_page[i])
            # if not, then append none
            else: 
                prof_review.append(None)
            # create a dataframe with all_reviews
            with open('rate_my_professor_links.csv','ab') as f : 
                writer = csv.writer(f)
                writer.writerow(prof_review)
            reviewed_list.append(prof_name)
            print(str(index) + '. COMPLETED : '  + str(prof_review))
driver.quit()
    #print(all_reviews)

