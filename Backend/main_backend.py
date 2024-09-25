import tensorflow as tf
from tensorflow.keras.models import load_model

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta

app = FastAPI()

MODEL = load_model('Models/btc.h5', custom_objects={'mse': 'mean_squared_error'})

sc = MinMaxScaler(feature_range=(0, 1))

# Función para obtener los últimos 60 días de precios
def get_last_60_days(asset):
    name = asset + '-USD'
    
    date_current = datetime.now()
    date_60_days_ago = date_current - timedelta(days=60)
    
    df = yf.download(name, start=date_60_days_ago.strftime('%Y-%m-%d'), end=date_current.strftime('%Y-%m-%d'))
    
    last_60_days = df['Adj Close'].values
    
    return last_60_days

# Nueva función para obtener las fechas y precios de cierre
def get_price_data(asset):
    name = asset + '-USD'
    
    date_current = datetime.now()
    date_60_days_ago = date_current - timedelta(days=60)
    
    df = yf.download(name, start=date_60_days_ago.strftime('%Y-%m-%d'), end=date_current.strftime('%Y-%m-%d'))
    
    # Extraer las fechas y los precios de cierre ajustados
    price_data = df[['Adj Close']].reset_index()
    
    return price_data

@app.get('/')
async def index():
    return {"message": "API para predecir precios de BTC"}

@app.post('/predict/')
async def predict(asset: str):
    # Descargar los últimos 60 días de precios
    last_60_days = get_last_60_days(asset)
    
    # Validar que hayamos obtenido exactamente 60 días de precios
    if len(last_60_days) != 60:
        return {"error": "No se pudieron obtener exactamente 60 días de precios"}

    last_60_days_scaled = sc.fit_transform(last_60_days.reshape(-1, 1))

    last_60_days_scaled = np.reshape(last_60_days_scaled, (1, 60, 1))

    prediction = MODEL.predict(last_60_days_scaled)

    predicted_price = sc.inverse_transform(prediction)

    return {"predicted_price": float(predicted_price[0][0])}

@app.get('/btc_prices/')
async def btc_prices(asset: str):
    # Obtener datos de precio
    price_data = get_price_data(asset)
    
    prices = price_data.to_dict(orient='records')
    
    return {"btc_prices": prices}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)

