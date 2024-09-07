import yfinance as yf

btc_data = yf.download('BTC-USD', start='2022-01-01', end='2024-09-06')
eth_data = yf.download('ETH-USD', start='2022-01-01', end='2024-09-06')

print(eth_data.head())
print(btc_data.head())

btc_data.to_csv('../Data/BTC-USD.csv')
eth_data.to_csv('../Data/ETH-USD.csv')
