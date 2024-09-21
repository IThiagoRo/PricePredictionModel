import tensorflow as tf
from tensorflow.keras.models import load_model

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

import numpy as np

#MODEL = tf.keras.models.load_model('Models/btc.h5')
MODEL = load_model('Models/btc.h5', custom_objects={'mse': 'mean_squared_error'})

app = FastAPI()

class UserInput(BaseModel):
    user_input: float

@app.get('/')
async def index():
    return {"Message": "This is Index"}

@app.post('/predict/')
async def predict(UserInput: UserInput):

    prediction = MODEL.predict([UserInput.user_input])

    return {"prediction": float(prediction)}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
