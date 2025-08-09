import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
import torch.nn.functional as F
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io

MODEL_PATH = "./models/final_model.pth"  
CLASS_NAMES = ['Accessory Gift Set',
 'Baby Dolls',
 'Backpacks',
 'Bangle',
 'Basketballs',
 'Bath Robe',
 'Beauty Accessory',
 'Belts',
 'Blazers',
 'Body Lotion',
 'Body Wash and Scrub',
 'Booties',
 'Boxers',
 'Bra',
 'Bracelet',
 'Briefs',
 'Camisoles',
 'Capris',
 'Caps',
 'Casual Shoes',
 'Churidar',
 'Clothing Set',
 'Clutches',
 'Compact',
 'Concealer',
 'Cufflinks',
 'Cushion Covers',
 'Deodorant',
 'Dresses',
 'Duffel Bag',
 'Dupatta',
 'Earrings',
 'Eye Cream',
 'Eyeshadow',
 'Face Moisturisers',
 'Face Scrub and Exfoliator',
 'Face Serum and Gel',
 'Face Wash and Cleanser',
 'Flats',
 'Flip Flops',
 'Footballs',
 'Formal Shoes',
 'Foundation and Primer',
 'Fragrance Gift Set',
 'Free Gifts',
 'Gloves',
 'Hair Accessory',
 'Hair Colour',
 'Handbags',
 'Hat',
 'Headband',
 'Heels',
 'Highlighter and Blush',
 'Innerwear Vests',
 'Ipad',
 'Jackets',
 'Jeans',
 'Jeggings',
 'Jewellery Set',
 'Jumpsuit',
 'Kajal and Eyeliner',
 'Key chain',
 'Kurta Sets',
 'Kurtas',
 'Kurtis',
 'Laptop Bag',
 'Leggings',
 'Lehenga Choli',
 'Lip Care',
 'Lip Gloss',
 'Lip Liner',
 'Lip Plumper',
 'Lipstick',
 'Lounge Pants',
 'Lounge Shorts',
 'Lounge Tshirts',
 'Makeup Remover',
 'Mascara',
 'Mask and Peel',
 'Mens Grooming Kit',
 'Messenger Bag',
 'Mobile Pouch',
 'Mufflers',
 'Nail Essentials',
 'Nail Polish',
 'Necklace and Chains',
 'Nehru Jackets',
 'Night suits',
 'Nightdress',
 'Patiala',
 'Pendant',
 'Perfume and Body Mist',
 'Rain Jacket',
 'Rain Trousers',
 'Ring',
 'Robe',
 'Rompers',
 'Rucksacks',
 'Salwar',
 'Salwar and Dupatta',
 'Sandals',
 'Sarees',
 'Scarves',
 'Shapewear',
 'Shirts',
 'Shoe Accessories',
 'Shoe Laces',
 'Shorts',
 'Shrug',
 'Skirts',
 'Socks',
 'Sports Sandals',
 'Sports Shoes',
 'Stockings',
 'Stoles',
 'Sunglasses',
 'Sunscreen',
 'Suspenders',
 'Sweaters',
 'Sweatshirts',
 'Swimwear',
 'Tablet Sleeve',
 'Ties',
 'Ties and Cufflinks',
 'Tights',
 'Toner',
 'Tops',
 'Track Pants',
 'Tracksuits',
 'Travel Accessory',
 'Trolley Bag',
 'Trousers',
 'Trunk',
 'Tshirts',
 'Tunics',
 'Umbrellas',
 'Waist Pouch',
 'Waistcoat',
 'Wallets',
 'Watches',
 'Water Bottle',
 'Wristbands']  

def get_model(num_classes):
    model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = get_model(len(CLASS_NAMES))
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Image classification API is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    img_tensor = transform(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(img_tensor)
        probs = F.softmax(outputs, dim=1)  # Convert logits to probabilities
        confidence, predicted = torch.max(probs, 1)  # Get top prob & class index
        
        class_name = CLASS_NAMES[predicted.item()]
        confidence_score = confidence.item()  # Float between 0 and 1

    return {
        "predicted_class": class_name,
        "confidence": round(confidence_score, 4)  # optional rounding
    }

