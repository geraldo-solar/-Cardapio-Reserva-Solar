from PIL import Image
import numpy as np

def fix_logo():
    # Load the image
    img = Image.open("sponsor-2-final.jpg")
    img = img.convert("RGBA")
    
    # Get pixel data
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if the pixel is white (background) or close to white (grayscale)
        # item is (R, G, B, A)
        brightness = sum(item[:3]) / 3
        
        if brightness > 200: 
            # If bright (white background), make it fully transparent
            new_data.append((255, 255, 255, 0))
        else:
            # If dark (logo), make it white and opaque
            # But the logo is dark/gold. We want white.
            # So replace with purely white pixel (255, 255, 255, 255)
            # Actually, to be safe, keep original shape?
            # User wants: font WHITE, background TRANSPARENT.
            # So ANY pixel that is NOT background should become WHITE.
            new_data.append((255, 255, 255, 255))
            
    img.putdata(new_data)
    img.save("cerpa-fixed.png", "PNG")
    print("Logo fixed and saved as cerpa-fixed.png")

if __name__ == "__main__":
    fix_logo()
