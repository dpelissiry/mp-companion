from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
prefs = {"download.default_directory" : 'C:\\Users\\dpeli\\OneDrive\\Python\\mp_scraper\\data\\sport'}
chrome_options.add_experimental_option("prefs", prefs)
chrome_options.add_argument("--ignore-ssl-errors=yes")
chrome_options.add_argument("--ignore-certificate-errors")

driver = webdriver.Chrome(options=chrome_options)
states = [105905173,105909311,105708962,105901027,105806977,106861605,111721391,105897947,106316122,105708958,105911816,112389571,106092653,107235316,105868674,116720343,105948977,106029417,105908062,106113246,105812481,108307056,105899020,105907492,116096758,105708961,105872225,106374428,105708964,105800424,105873282, 106598130,105994953,105854466,105708965,105913279,106842810,107638915,105708963,105887760,105835804,105708957,105891603,105852400,105708966,105855459,105708968,105708960]
max_grade = 12400
for state in states:
    grade = 800
    while grade <= max_grade:
        driver.get(f"https://www.mountainproject.com/route-finder?selectedIds={state}&type=rock&diffMinrock={grade}&diffMinboulder=20000&diffMinaid=70000&diffMinice=30000&diffMinmixed=50000&diffMaxrock={grade}&diffMaxboulder=20050&diffMaxaid=75260&diffMaxice=38500&diffMaxmixed=60000&is_sport_climb=1&stars=1.8&pitches=0&sort1=popularity+desc&sort2=rating")
        grade_check = driver.find_element(By.XPATH, '//*[@id="body-climb"]/div[8]/div/div[2]/div/div[1]')        
        grade += 100
        if "5.?" in grade_check.text or "Results 1 to 0 of 0" in grade_check.text:
            continue

        export = driver.find_element(By.XPATH,'//*[@id="body-climb"]/div[8]/div/div[2]/div/div[1]/a[2]')
        export.click()
        WebDriverWait(driver, 10)
        # min_grade = driver.find_element(By.XPATH,f'//*[@id="diffMinboulder"]/option[{v}]')
        # max_grade = driver.find_element(By.XPATH,f'//*[@id="diffMaxboulder"]/option[{v}]')
        # search = driver.find_element(By.XPATH,'//*[@id="routeFinderForm"]/table/tbody/tr[6]/td[2]/input')
        

