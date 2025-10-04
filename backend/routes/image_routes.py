# ✨ backend/routes/image_routes.py
from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

# Create a blueprint for image upload routes
image_bp = Blueprint("image_bp", __name__)

# Folder to temporarily store uploads
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route("/upload-image", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"success": False, "message": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"success": False, "message": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)  # Save to uploads folder for now

        return jsonify({"success": True, "filename": filename, "message": "File uploaded successfully"}), 200

    return jsonify({"success": False, "message": "Invalid file type"}), 400
