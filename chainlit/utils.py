from app import predict
from PIL import Image
import numpy as np

def cancer_category(percentage):
    if percentage>=0 and percentage<25:
        return "Pre Benign"
    elif percentage>=25 and percentage<50:
        return "Benign"
    elif percentage>=50 and percentage<75:
        return "Pre Malignant"
    else:
        return "Malignant"
    
def get_prediction():
    image = Image.open("image.jpg")
    image = image.resize((150, 150))
    image_array = np.array(image)/255.0
    image_array = np.expand_dims(image_array, axis=0)
    res = predict(image_array)
    return res
