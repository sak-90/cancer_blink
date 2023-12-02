from keras.models import load_model

# Load the trained model
model = load_model('skin_model.h5')

# This function will receive preprocessed image
def predict(image):
    # Make a prediction using the model
    prediction = model.predict(image)
    
    # Get the sigmoid percentage
    sigmoid_percentage = prediction[0][0] * 100
    
    # Get the predicted class label
    if prediction[0][0] < 0.5:
        label = 'Benign'
    else:
        label = 'Malignant'
    
    return {
        "has_cancer":sigmoid_percentage>=20,
        "cancer_type":label,
        "sigmoid_percentage":sigmoid_percentage
    }
