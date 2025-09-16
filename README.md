# AI Campaign Assistant

An AI-powered campaign assistant with a React + TypeScript frontend and Flask backend to help Google Ads and Meta Ads managers optimize campaigns through intelligent, data-driven suggestions.

---

## Features

### Frontend (React + TypeScript + Shadcn/UI)

- Product-based campaign suggestions based on entered product details (e.g., baby toys, baby dresses)
- Audience targeting by age, gender, and optional interests
- Platform recommendation: Suggests the best platform (Google Ads or Meta Ads) to run campaigns
- Geo-targeting: Recommends optimal locations based on demographics
- Campaign insights including ad copy/caption suggestions, budget allocation, and ideal publishing time
- Media upload support for images and videos as campaign content

### Backend (Flask + AI)

- AI training on historical campaign data to improve suggestion accuracy
- Platform optimization to predict campaign performance on Google or Meta
- REST API endpoints to receive campaign details, return AI recommendations, and upload media

---

## Installation

### Frontend

Clone repo and enter frontend directory
git clone <repo-url>
cd frontend

Install dependencies
npm install

Run development server
npm run dev

text

### Backend

Create and activate Python virtual environment
python -m venv venv
source venv/bin/activate # Linux/Mac
venv\Scripts\activate # Windows

Install dependencies
pip install -r requirements.txt

Run Flask server
flask run

text

---

## Usage

1. Open the frontend in your browser (default: `http://localhost:5173`).
2. Enter product, audience, and campaign details.
3. Upload media files for the campaign if desired.
4. Submit the form to receive AI-driven recommendations:
   - Suggested platforms (Google or Meta)
   - Recommended target locations
   - Ad copy, budget allocation, and publishing time

---

## Tech Stack

- Frontend: React, TypeScript, Shadcn/UI, Vite
- Backend: Python, Flask
- AI/ML: Python libraries (scikit-learn, pandas, PyTorch or TensorFlow)
- Database (optional): PostgreSQL or any relational database

---

## Project Structure

frontend/ # React + TypeScript frontend source code
backend/ # Flask backend API and AI model
uploads/ # Uploaded media files storage

text

---

## Notes

- Ensure the Flask backend is running before submitting campaigns from the frontend.
- AI recommendations will improve with more campaign data and training over time.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check issues or submit pull requests.

---