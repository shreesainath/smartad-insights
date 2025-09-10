AI Campaign Assistant

This project is a React + TypeScript frontend with a Flask backend for an AI-powered campaign assistant. It helps Google Ads and Meta Ads managers optimize campaigns by providing intelligent suggestions based on product, audience, and geographic data.

Features
Frontend (React + Shadcn/UI)

Product-Based Campaign Suggestions
Enter product details (e.g., baby toys, baby dresses) and get AI-driven campaign recommendations.

Audience Targeting

Age range

Gender

Interests (optional)

Platform Recommendation
Suggests the best platforms (Google Ads or Meta Ads) to run campaigns.

Location-Based Targeting
Recommends geographic areas to run campaigns based on demographics.

Campaign Insights

Ad copy / caption suggestions

Budget allocation

Optimal publishing time

Media Upload Support
Upload images or videos for campaign content.

Backend (Flask + AI)

AI Training
Uses historical campaign data to train the AI model for better campaign suggestions.

Platform Optimization
Determines which platform (Google or Meta) is likely to perform best based on product, audience, and location.

API Endpoints
Provides endpoints for:

Receiving campaign details

Returning AI recommendations

Uploading media files

Installation
Frontend
# Clone repository
git clone <repo-url>
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

Backend
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run Flask server
flask run

Usage

Open the frontend in your browser (http://localhost:5173 if using Vite).

Enter product, audience, and campaign details.

Upload media files for the campaign.

Submit to get AI-driven campaign suggestions:

Recommended platforms (Google or Meta)

Target locations

Ad copy and budget allocation

Tech Stack

Frontend: React, TypeScript, Shadcn/UI, Vite

Backend: Python, Flask

Database (optional): PostgreSQL or any relational database

AI/ML: Python libraries (e.g., scikit-learn, pandas, PyTorch, or TensorFlow)

Project Structure
frontend/      # React frontend
backend/       # Flask backend
uploads/       # Uploaded media files

Notes

Ensure the Flask backend is running before submitting campaigns from the frontend.

AI suggestions improve over time with more campaign data.