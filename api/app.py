from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# SQLite for development
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mazingira.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'))
    is_anonymous = db.Column(db.Boolean, default=False)
    is_recurring = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/organizations', methods=['GET'])
def get_organizations():
    organizations = Organization.query.filter_by(status='approved').all()
    return jsonify([{
        'id': org.id,
        'name': org.name,
        'description': org.description
    } for org in organizations])

@app.route('/api/organizations/apply', methods=['POST'])
def apply_organization():
    data = request.json
    org = Organization(
        name=data['name'],
        description=data['description']
    )
    db.session.add(org)
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 201

@app.route('/api/donations', methods=['POST'])
def create_donation():
    data = request.json
    donation = Donation(
        amount=data['amount'],
        donor_id=data['donor_id'],
        organization_id=data['organization_id'],
        is_anonymous=data.get('is_anonymous', False),
        is_recurring=data.get('is_recurring', False),
        frequency=data.get('frequency')
    )
    db.session.add(donation)
    db.session.commit()
    return jsonify({'message': 'Donation processed successfully'}), 201

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)