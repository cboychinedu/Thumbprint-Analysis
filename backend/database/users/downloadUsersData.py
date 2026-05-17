#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import io 
import csv 
import base64
import zipfile
from datetime import datetime 

# Creating a class for handling the extracting downloadable data
# from the database 
class HandleDownloadAnalyzedHistory:        
    # Creating a method for getting the images, and data 
    def compileSingleHistoryAsCsv(self, email, historyData):        
        # If the history data is None 
        if not historyData: 
            return {"status": "error", "message": "No history data was found!", "statusCode": 404 }
        
        # If the history data was found, convert the history data into 
        # a csv file 
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        zipFilename = f"history{email}{timestamp}csv.zip"
        zipPath = os.path.join(self.historyDir, zipFilename)
        
        # Using try catch block to create the zip file 
        try: 
            # Create an in-memory buffer for the zip file 
            zipBuffer = io.BytesIO() 
            
            # Creating the zip file 
            with zipfile.ZipFile(zipBuffer, "a", zipfile.ZIP_DEFLATED, False) as zipFile: 
                # Create the CSV content 
                csvBuffer = io.StringIO() 
                csvWriter = csv.writer(csvBuffer)
                csvWriter.writerow(["Id", "PredictedResult", "status", "confidence", "latency", "timestamp", "typeValue"])
                
                # For entry in the data 
                for entry in historyData: 
                    # Get the entry values 
                    idValue, predictedResult, status, confidence, latency, encodedImage, timestamp, typeValue = entry.values()
                    imageName = f"image{idValue}.jpg"
                    
                    # Add row to the CSV 
                    csvWriter.writerow([idValue, predictedResult, status, confidence, latency, timestamp, typeValue])
                    
                    # Process and add the Image to zip 
                    try: 
                        # Assuming the image data is a base64 encoded string 
                        header, encoded = encodedImage.split(",", 1) if "," in encodedImage else (None, encodedImage)
                        binaryImg = base64.b64decode(encoded)
                        zipFile.writestr(f"images/{imageName}", binaryImg)
                        
                    # On exception, execute the block of code below 
                    except Exception as error: 
                        # Display the error message 
                        print(f"Failed to process the image {idValue}: {error}")
                        
                # Adding the csv file to zip 
                zipFile.writestr("historyData.csv", csvBuffer.getvalue())

            # Save the buffer to a file 
            with open(zipPath, "wb") as file: 
                # Write the buffer to a file 
                file.write(zipBuffer.getvalue())
            
            # Returning the success message 
            return {"status": "success", "path": zipPath, "message": "CSV History zipped successfully!"}
        
        # On error generated, execute the block of code below 
        except Exception as error: 
            # Display the error message 
            print(f"[Export Error]: {error}")
            
            # Building the response message 
            responseMessage = {
                "status": "error", 
                "message": str(error), 
                "statusCode": 505
            }
            
            # Sending the response message 
            return responseMessage; 