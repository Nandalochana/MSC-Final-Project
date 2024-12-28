from keras.models import Sequential
from keras.layers import Dense
import pandas as pd
import numpy as np

class NeuralNetwork:
    def __init__(self):
        self.model = Sequential()
        self.model.add(Dense(64, activation='relu', input_shape=(2,)))  # Input layer for latitude and longitude
        self.model.add(Dense(32, activation='relu'))
        self.model.add(Dense(1, activation='linear'))  # Output layer for rating

    def compile_model(self):
        self.model.compile(optimizer='adam', loss='mean_squared_error')

    def train(self, data_path, epochs=100):
        data = pd.read_csv(data_path)
        X = data[['latitude', 'longitude']].values
        y = data['rating'].values

        self.model.fit(X, y, epochs=epochs)

    def predict(self, latitude, longitude):
        return self.model.predict(np.array([[latitude, longitude]]))