

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [ 
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.layers.TFSMLayer("../saved_models/1", call_endpoint='serving_default')

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert('RGB')
    # Image ko float32 mein badla aur pixel values ko normalized kiya (agar training mein kiya tha toh)
    return np.array(image).astype(np.float32)

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    try:
        # 1. Image ko read kiya
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)
        
        # 2. Model call kiya
        predictions_dict = MODEL(img_batch)
        
        # --- DEBUG PRINT: Terminal mein dekhne ke liye ki model kya de raha hai ---
        print("\n=== DEBUG INFO ===")
        print("Type of predictions_dict:", type(predictions_dict))
        print("Content of predictions_dict:", predictions_dict)
        # ------------------------------------------------------------------------

        # 3. Output nikalne ki koshish
        if isinstance(predictions_dict, dict):
            predictions = list(predictions_dict.values())[0].numpy()
        else:
            predictions = predictions_dict.numpy()

        predicted_class = CLASS_NAMES[np.argmax(predictions)]
        confidence = np.max(predictions)
        
        return {
            'class': predicted_class,
            'confidence': float(confidence)
        }
        
    except Exception as e:
        # Agar koi bhi error aayega, toh wo terminal mein poora print hoga
        import traceback
        print("\n!!! CRITICAL ERROR !!!")
        traceback.print_exc()
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8001)
