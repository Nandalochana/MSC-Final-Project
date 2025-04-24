import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os
import absl.logging

# Disable ANSI escape codes in TensorFlow logs
absl.logging.set_verbosity(absl.logging.ERROR)

def load_data(ratings):
    data = np.array([[r['latitude'], r['longitude'], r['rating']] for r in ratings])  # Include rating as an input feature
    return data

def calculate_distance(lat1, lon1, lat2, lon2):
    # Haversine formula to calculate the distance between two points on the Earth
    R = 6371  # Radius of the Earth in kilometers
    dlat = np.radians(lat2 - lat1)
    dlon = np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = R * c
    return distance

def main():
    ratings = json.loads(sys.argv[1])
    data = load_data(ratings)

    # Get the absolute path to the model file
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'rating_model.h5')
    model = load_model(model_path)
    predictions = model.predict(data)

    # Calculate distances and combine with predictions
    base_lat, base_lon = ratings[0]['latitude'], ratings[0]['longitude']
    results = []
    for i, rating in enumerate(ratings):
        distance = calculate_distance(base_lat, base_lon, rating['latitude'], rating['longitude'])
        score = float(predictions[i][0])  # Convert float32 to float
        results.append({
            'userId': rating['userId'],  # Include userId in the result
            'latitude': rating['latitude'],
            'longitude': rating['longitude'],
            'rating': rating['rating'],
            'distance': distance,
            'score': score
        })

    # Sort results by score and distance
    sorted_results = sorted(results, key=lambda x: (x['score'], x['distance']))

    print(json.dumps(sorted_results))

if __name__ == "__main__":
    main()