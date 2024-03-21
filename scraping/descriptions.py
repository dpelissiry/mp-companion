import os
import glob
import pandas as pd
import csv
import time

from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

#decription, image url, protection, num_votes
class Grabber():
    def __init__(self,timeout):
        self.place = 0
        self.t = timeout
    def description_scrape(self,url_to_scrape, f,write = True):
        """Get description from route URL"""

        # Get HTML info
        uClient = uReq(url_to_scrape) # request the URL
        page_html = uClient.read() # Read the html
        uClient.close() # close the connection
        route_soup = soup(page_html, "html.parser")
        

        # Get route description headers
        heading_container = route_soup.findAll("h2", {"class":"mt-2"})
        heading_container[0].text.strip()
        headers = ""
        for h in range(len(heading_container)):
            headers += "&&&" + heading_container[h].text.strip()
        headers = headers.split("&&&")[1:]

        # Get route description text
        #route_soup = soup(page_html, "html.parser")
        desc_container = route_soup.findAll("div", {"class":"fr-view"})
        words = ""
        for l in range(len(desc_container)):
            words += "&&&" + desc_container[l].text

        words = words.split("&&&")[1:]
        
        # Combine into dictionary
        route_dict = dict(zip(headers, words))
        
        
        # Add URL to dictionary
        route_dict["URL"] = url_to_scrape
        
        # Get number of votes on star rating and add to dictionary
        star_container = route_soup.find("span", id="route-star-avg")
        num_votes = int(star_container.span.span.text.strip().split("from")[1].split("\n")[0].replace(",", ""))
        route_dict["star_votes"] = num_votes
        
        
        #get image
        try:
            image = route_soup.find('div', id="carousel-item-0").find("a")
            route_dict["image"] = image['href']
        except:
            route_dict["image"] = None

        if write == True:
            # Write to file:
            f.writerow([route_dict["URL"],
                    route_dict.setdefault("Description", "none listed"),
                    route_dict.setdefault("Protection", "none listed"),
                    str(route_dict["star_votes"]),
                    route_dict.setdefault("image", "None"),])
        else:
            return route_dict
    def timeout(self):
        print(f"Backing off for {self.t} seconds")
        time.sleep(self.t)
        self.t *= 2
        if self.t > 120:
            self.t = 120
    def main(self):
        with open('boulders.csv', 'r', newline='' , encoding='utf-8') as read_file:
            with open("boulders_desc.csv",'a', newline='', encoding='utf-8') as write_file:
            # Create a CSV reader

                
                write = csv.writer(write_file)
                reader = csv.reader(read_file)

                headers = ["URL", "desc", "protection", "num_votes", "image"]
                #write.writerow(headers)
                
                # Optional: Skip the header if there is one
                for i in range(32816):
                    next(reader)
                
                
                # Iterate through each row
                for row in reader:
                    #print(row)
                    #break
                    # Assuming the column you want is the first one (index 0)
                    try:
                        self.description_scrape(row[2],write)
                    except:
                        self.timeout()
                    #self.place+=1
                    # for route_url in tqdm(all_route_urls):
                    #     description_scrape(route_url)
                    #     time.sleep(.05)

                # t1 = time.time()
                # t1-t0


def compare():
    with open('boulders.csv', 'r', newline='' , encoding='utf-8') as read_file:
            with open("boulders_desc.csv",'r', newline='', encoding='utf-8') as read_file2:
            # Create a CSV reader

                
                reader2 = csv.reader(read_file2)
                reader = csv.reader(read_file)
                for row1, row2 in zip(reader, reader2):
                    if row1[2] != row2[0]:
                        print(row1,row2)
                        break
# grab = Grabber(10)
# grab.main()
                    
compare()
