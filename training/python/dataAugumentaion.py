# Importing the necessary modules 
import cv2
import os
import numpy as np
import random

# Creating a function for performing data augmentation 
def augmentThumbprintDataset(inputFolder, outputFolder, targetCount=200):
    """
    Reads images from inputFolder, applies random brightness and noise,
    and saves them to outputFolder until targetCount is reached.
    """
    # Create output directory if it doesn't exist
    if not os.path.exists(outputFolder):
        os.makedirs(outputFolder)

    # Get list of original images
    imageExtensions = ('.jpg', '.jpeg', '.png', '.bmp')
    originalImages = [f for f in os.listdir(inputFolder) if f.lower().endswith(imageExtensions)]

    if not originalImages:
        print("Error: No images found in the input folder.")
        return

    print(f"Starting augmentation. Original images found: {len(originalImages)}")

    currentCount = 0
    
    # Loop until we reach the target count
    while currentCount < targetCount:
        for imageName in originalImages:
            if currentCount >= targetCount:
                break

            # Load the image using OpenCV
            imagePath = os.path.join(inputFolder, imageName)
            baseImage = cv2.imread(imagePath)

            if baseImage is None:
                continue

            # 1. Random Brightness (Shades)
            # Convert to HSV to easily manipulate brightness (Value channel)
            hsvImage = cv2.cvtColor(baseImage, cv2.COLOR_BGR2HSV)
            brightnessFactor = random.uniform(0.5, 1.5) # Darker to Lighter
            hsvImage[:, :, 2] = np.clip(hsvImage[:, :, 2] * brightnessFactor, 0, 255)
            augmentedImage = cv2.cvtColor(hsvImage, cv2.COLOR_HSV2BGR)

            # 2. Add Impurities (Salt and Pepper Noise)
            # This simulates dust or sensor noise on the thumbprint scanner
            noiseProbability = 0.02 # 2% of pixels affected
            for i in range(augmentedImage.shape[0]):
                for j in range(augmentedImage.shape[1]):
                    rdn = random.random()
                    if rdn < noiseProbability / 2:
                        augmentedImage[i][j] = [0, 0, 0] # Pepper (Black)
                    elif rdn < noiseProbability:
                        augmentedImage[i][j] = [255, 255, 255] # Salt (White)

            # Generate a unique filename
            newName = f"aug_{currentCount}_{imageName}"
            outputPath = os.path.join(outputFolder, newName)

            # Save the processed image
            cv2.imwrite(outputPath, augmentedImage)
            currentCount += 1

    print(f"Processing complete. {currentCount} images available in: {outputFolder}")


# Ensure these paths point to your actual local directories
inputDir = "raw_thumbprints" 
outputDir = "augmented_dataset"

# Running the function 
augmentThumbprintDataset(inputDir, outputDir, 200)