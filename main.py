import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import keras
from keras.models import Sequential
from keras.layers import Dense, LSTM
from datetime import datetime

def get_data(asset):
    name = asset + '-USD'
    date_current = datetime.now()
    date_current = date_current.strftime('%Y-%m-%d')

    df = yf.download(name, start='2022-01-01', end=date_current)
    print(df)
    return df

def model(df, asset):
    set_entrenamiento = df[:'2024-04-01'].iloc[:,1:2]
    set_validacion = df['2024-04-01':].iloc[:,1:2]
    
    sc = MinMaxScaler(feature_range=(0,1))
    set_entrenamiento_escalado = sc.fit_transform(set_entrenamiento)

    time_step = 60
    X_train = []
    Y_train = []
    m = len(set_entrenamiento_escalado)

    for i in range(time_step, m):
        # X: Block of timestep
        X_train.append(set_entrenamiento_escalado[i-time_step:i, 0])

        # Y: Next data
        Y_train.append(set_entrenamiento_escalado[i, 0])
    
    X_train, Y_train = np.array(X_train), np.array(Y_train)
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))

    dim_entrada = (X_train.shape[1], 1)
    dim_salida = 1
    na = 50

    modelo = Sequential()
    modelo.add(LSTM(units=na, input_shape=dim_entrada))
    modelo.add(Dense(units=dim_salida))
    modelo.compile(optimizer='rmsprop', loss='mse')
    modelo.fit(X_train, Y_train, epochs=20, batch_size=32)

    # Validation
    x_test = set_validacion.values
    x_test = sc.transform(x_test)

    X_test = []
    for i in range(time_step, len(x_test)):
        X_test.append(x_test[i-time_step:i, 0])
    X_test = np.array(X_test)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    prediccion = modelo.predict(X_test)
    prediccion = sc.inverse_transform(prediccion)

    print(prediccion)
    modelo.save(f'Models/{asset}.h5')
    modelo.save(f'Backend/Models/{asset}.h5')
    
     # Predicción para el día de mañana
    ultimo_bloque = set_validacion.values[-time_step:]
    ultimo_bloque = sc.transform(ultimo_bloque)  # Escalar
    ultimo_bloque = np.reshape(ultimo_bloque, (1, time_step, 1))

    # Predecir el próximo valor
    prediccion_manana = modelo.predict(ultimo_bloque)
    prediccion_manana = sc.inverse_transform(prediccion_manana)

    print(f"Predicción para mañana: {prediccion_manana[0][0]}")


if __name__ == '__main__':
    asset = input("Ingrese el nombre de la accion:")
    df = get_data(asset.upper())
    model(df, asset)
