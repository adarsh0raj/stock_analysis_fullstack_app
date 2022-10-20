from nsepy.history import get_price_list
import argparse
import datetime
import pandas as pd

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



