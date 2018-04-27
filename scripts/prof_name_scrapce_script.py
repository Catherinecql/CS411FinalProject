import sys
import imaplib
import getpass
import datetime
import webbrowser
import sys
import linecache
import os
import csv

from selenium.webdriver.firefox.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.support.ui import WebDriverWait

import re
from time import sleep 
import numpy as np 
import pandas as pd
import base64


url = 'https://cs.illinois.edu/people/all-faculty'
driver = webdriver.Firefox()
driver.get(url)
prof_info = []
for i in range(1,158):
	info     = []
	dirlist  = driver.find_element_by_css_selector('#block-block-52 > div > div > div > article:nth-child(' + str(i) + ')').text
	dirlist  = dirlist.encode('ascii','ignore').split('\n')
	dirlist = [dirlist[0],dirlist[-1]]
	prof_info.append(dirlist)
print(prof_info)
df = pd.DataFrame(columns = ['professor names','netid'], data = prof_info)
df.to_csv('prof_name_data.csv', mode='wb',index=False)
driver.quit()
