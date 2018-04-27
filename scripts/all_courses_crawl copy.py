import webbrowser
import numpy as np
import pandas as pd
import csv
import sys
import copy
from selenium import webdriver
from time import sleep 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
driver = webdriver.Firefox()
courses_url = 'https://courses.illinois.edu/schedule/2018/fall/'

#getting subject URLs & number of courses in each subject
num_subjects = 184

def wait_and_get(browser, cond, maxtime): 
    flag = True

    while flag:
        try: 
            ret = WebDriverWait(browser, maxtime).until(cond)
            sleep(2)
            ret = WebDriverWait(browser, maxtime).until(cond)
            flag = False
            return ret
        except TimeoutException:
            print("Time out")
            flag = False
            while len(browser.window_handles) > 1:
                browser.switch_to_window(browser.window_handles[-1])
                browser.close()
                browser.switch_to_window(browser.window_handles[0])
                flag = True
            if not flag:
                try:
                    browser.find_elements_by_id("searchID").click()
                    flag = True
                except:
                    print("Time out without pop-ups. Exit.")
                    return "exit"
# ----------------------------------------------------------------------------------------------------------------------------------------------------------------
def crawl_course_info(url, num_courses):
    driver.get(url)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    course_subjects = [] #getting course subjects
    course_codes = [] #getting course codes 
    course_names = [] #getting course names (titles)

    for i in range(1, num_courses+1):
        curr_subj = (driver.find_element_by_css_selector('tr:nth-child('+str(i)+') > td:nth-child(1)').text).split()[0]
        curr_code = (driver.find_element_by_css_selector('tr:nth-child('+str(i)+') > td:nth-child(1)').text).split()[1]
        curr_name = driver.find_element_by_css_selector('tr:nth-child('+str(i)+') > td:nth-child(2) > a:nth-child(1)').text      
        course_subjects.append(curr_subj)
        course_codes.append(curr_code)
        course_names.append(curr_name)

    course_info = []

    for k in range(num_courses): #getting professor names & combining it all
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # click on course title
        title_cond = EC.presence_of_element_located((By.CSS_SELECTOR,"#default-dt > tbody > tr:nth-child(" + str(k+1) + ") > td:nth-child(2) > a"))
        title_handle = wait_and_get(driver, title_cond, 30)
        if title_handle == 'exit': 
            while title_handle == 'exit': 
                print('refreshing: 1')
                driver.refresh()
                title_cond = EC.presence_of_element_located((By.CSS_SELECTOR,"#default-dt > tbody > tr:nth-child(" + str(k+1) + ") > td:nth-child(2) > a"))
                title_handle = wait_and_get(driver, title_cond, 30)
        title_handle.click()
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        info = [] #making a list of lists here
        info.append(course_subjects[k])
        info.append(course_codes[k])
        info.append(course_names[k])
        prof_list = []
        found = 0
        for m in range(1,100):
            if m == 1: 
                prof_cond = EC.presence_of_element_located((By.CSS_SELECTOR,'#uid' + str(m) + ' > td:nth-child(10)'))
                prof_handle = wait_and_get(driver, prof_cond, 10)
                count = 0
                if prof_handle == 'exit': 
                    while prof_handle == 'exit': 
                        print('refreshing: 2')
                        driver.refresh()
                        prof_cond = EC.presence_of_element_located((By.CSS_SELECTOR,'#uid' + str(m) + ' > td:nth-child(10)'))
                        prof_handle = wait_and_get(driver, prof_cond, 10)
            else: 
                try:
                    prof_handle = driver.find_element_by_css_selector('#uid' + str(m) + ' > td:nth-child(10)')
                except NoSuchElementException:
                    break

            prof_name = str(prof_handle.text)
            if prof_name not in [' ', '', None]:
                if '\n' in prof_name:
                    prof_name = prof_name.split('\n')[0]
                prof_list.append(prof_name)
        for prof in list(set(prof_list)): 
            temp_list = info.copy()
            temp_list.append(prof)
            print(str(k) + '. ' +  str(temp_list))
            course_info.append(temp_list)
        driver.back()
        
    print(str(course_subjects[0]) + " Completed")
    return course_info
# ----------------------------------------------------------------------------------------------------------------------------------------------------------------
start = sys.argv[1]
with open('all_crawl.csv','a+') as f: #writing directly to CSV instead of going through Df's 
    writer = csv.writer(f)
    for i in range (int(start), num_subjects+1):
        print('HANDLING: ' + str(i))
        driver.get(courses_url)
        driver.maximize_window()
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        curr_subj = driver.find_element_by_css_selector('tr:nth-child('+str(i)+') > td:nth-child(1)').text   
        curr_url = courses_url + curr_subj
        driver.get(curr_url)
        curr_num = int((driver.find_element_by_class_name('dataTables_info').text).split()[0])
        x = crawl_course_info(curr_url, curr_num)
        writer.writerows(x)
        f.flush()
        print('-------------------------------------------------------------------------------')

driver.quit()
