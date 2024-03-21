import csv
import glob
import pandas as pd

# all_files = [f for f in glob.glob("C:\\Users\\dpeli\\OneDrive\\Python\\mp_scraper\\data\\sport\\*")]

# combined_csv = pd.concat([pd.read_csv(f) for f in all_files])

# combined_csv.to_csv( "routes.csv", index=False, encoding='utf-8-sig')
# routes = pd.read_csv("routes.csv")
# routes.drop_duplicates(subset = "URL", inplace = True)

def merge_desc():
    key_column = "URL"

    f1 = pd.read_csv("master_boulders.csv")
    # f2 = pd.read_csv("boulders_desc.csv")

    f1.drop_duplicates(subset=key_column,inplace=True)

    # merged = pd.merge(f1,f2,on=key_column,how='left')
    f1.to_csv("fixed.csv",index=False)
    # merged.to_csv('master_boulders.csv',index=False)

def check_desc():
    with open('boulders_desc.csv', 'r', newline='' , encoding='utf-8') as read_file:
        r = csv.reader(read_file)
        u_lines = set()
        for row in r:
            if row[0] in u_lines: continue

            u_lines.add(row[0])

        print(len(u_lines))
check_desc()



