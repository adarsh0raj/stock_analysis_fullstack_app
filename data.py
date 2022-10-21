from nsepy.history import get_price_list
import argparse
import datetime
import pandas as pd
import psycopg2
import psycopg2.extras

parser = argparse.ArgumentParser(description='NSE data downloader')
parser.add_argument('--start', type=str, default='2021-01-01', help='Start date')
parser.add_argument('--end', type=str, default='2021-01-10', help='End date')
args = parser.parse_args()

dates = [datetime.datetime.date(d) for d in pd.date_range(args.start, args.end)]
data = pd.DataFrame()

for d in dates:
    try:
        prices = get_price_list(dt=d)
        prices = prices[prices['SERIES'] == 'EQ']
        prices['DATE'] = pd.to_datetime(d)
        data = data.append(prices)
    except:
        continue

# print(data.dtypes)
conn = psycopg2.connect(dbname='zenskar', user='adarsh', password='adarsh', host='127.0.0.1', port='5432')
cur = conn.cursor()

ddl = '''DROP TABLE IF EXISTS Stocks;

        CREATE TABLE Stocks (
            SYMBOL varchar(255),
            SERIES varchar(255),
            OPEN float,
            HIGH float,
            LOW float,
            CLOSE float,
            LAST float,
            PREVCLOSE float,
            TOTTRDQTY int,
            TOTTRDVAL float,
            TIMESTAMP varchar(255),
            TOTALTRADES int,
            ISIN varchar(255),
            DATE date
        );'''

cur.execute(ddl)

vals = [tuple(x) for x in data.to_numpy()]
psycopg2.extras.execute_values(cur, "INSERT INTO Stocks VALUES %s", vals)

conn.commit()
conn.close()






