# Add this to your backend routes
import zipfile
import shutil

@dashboard.route("/train", methods=["POST"])
def trainModel():
    try:
        userToken = request.headers.get("x-auth-token")
        # Verify admin/authorized status here if needed
        
        if 'dataset' not in request.files:
            return jsonify({"message": "No dataset found", "status": "error"}), 400
            
        datasetZip = request.files['dataset']
        zipPath = os.path.join("temp_uploads", secure_filename(datasetZip.filename))
        extractPath = os.path.join("temp_uploads", "training_set")
        
        datasetZip.save(zipPath)
        
        # Extract the ZIP
        with zipfile.ZipFile(zipPath, 'r') as zip_ref:
            zip_ref.extractall(extractPath)
            
        # Trigger your ML training logic
        # mlClass.trainNewModel(extractPath)
        
        return jsonify({"message": "Training pipeline initiated", "status": "success"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500