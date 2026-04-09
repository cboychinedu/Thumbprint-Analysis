from PIL import Image

def convert_bmp_to_jpg(bmp_path, jpg_path):
    # Load the BMP image
    with Image.open(bmp_path) as img:
        # Convert to RGB if necessary (JPG doesn't support alpha/transparency)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        # Save as JPG
        img.save(jpg_path, 'JPEG', quality=95)

# Example usage:
convert_bmp_to_jpg('thumbprint.bmp', 'thumbprint.jpg')
