import os
from PIL import Image

def convertTiffToJpg(sourceDir, outputDir):
    # Create output directory if it doesn't exist
    if not os.path.exists(outputDir):
        os.makedirs(outputDir)

    # Walk through the source directory
    for root, dirs, files in os.walk(sourceDir):
        for fileName in files:
            if fileName.lower().endswith(('.tif', '.tiff')):
                # Construct full file paths
                filePath = os.path.join(root, fileName)
                
                # Create corresponding subdirectories in output folder
                relativePaths = os.path.relpath(root, sourceDir)
                targetSubDir = os.path.join(outputDir, relativePaths)
                
                if not os.path.exists(targetSubDir):
                    os.makedirs(targetSubDir)

                # Open and convert
                try:
                    with Image.open(filePath) as img:
                        # Convert to RGB (TIFFs are often CMYK or Grayscale)
                        rgbImg = img.convert('RGB')
                        
                        # Generate new filename
                        baseName = os.path.splitext(fileName)[0]
                        targetPath = os.path.join(targetSubDir, f"{baseName}.jpg")
                        
                        # Save as JPG
                        rgbImg.save(targetPath, "JPEG", quality=95)
                        print(f"Converted: {fileName}")
                except Exception as e:
                    print(f"Failed to convert {fileName}: {e}")

# Usage
sourcePath = 'dataset/unknown'
outputPath = 'dataset'
convertTiffToJpg(sourcePath, outputPath)