from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = FastAPI()

model = tf.keras.models.load_model('models/fashion_model.keras')

class_names = [
    'T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
    'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot'
]

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('L').resize((28, 28))
    image_array = np.array(image) / 255.0
    image_array = image_array.reshape(1, 28, 28)
    return image_array

@app.get("/")
def home():
    return {"message": "fashionItemClassifier API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image_array = preprocess_image(contents)

    prediciton = model.predict(image_array)
    class_index = np.argmax(prediciton)
    predicted_class = class_names[class_index]

    return JSONResponse(content={
        "predicted_class": predicted_class,
        "confidence": float(np.max(prediciton))
    })