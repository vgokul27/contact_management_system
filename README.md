# Contact Management System - MERN Stack

A full-stack contact management web application built with MongoDB, Express.js, React.js, and Node.js.

## Features

✅ **Contact Form** with validation
- Required fields: Name, Email, Phone
- Optional field: Message
- Real-time validation with error messages
- Submit button disabled until form is valid

✅ **Backend API**
- POST `/api/contacts` - Create new contact
- GET `/api/contacts` - Fetch all contacts
- GET `/api/contacts/:id` - Fetch single contact
- PUT `/api/contacts/:id` - Update contact
- DELETE `/api/contacts/:id` - Delete contact

✅ **MongoDB Database**
- Contact schema with validation
- Timestamps (createdAt, updatedAt)

✅ **Contact Display**
- Responsive design (mobile & desktop views)
- Table view for desktop, card view for mobile
- No page reload on submit
- Success message after adding contact

✅ **Bonus Features**
- Delete contact functionality with confirmation
- Success messages
- Reusable components
- Sorting by name, email, or phone (ascending/descending)
- Clean, modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js + Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **State Management:** React useState
- **HTTP Client:** Fetch API

## Project Structure

```
ContactManager/
├── backend/
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contacts.js         # API routes
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Express server
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ContactForm.jsx    # Form component
    │   │   └── ContactList.jsx    # List component
    │   ├── App.jsx                # Main app component
    │   ├── index.css              # Tailwind imports
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Install MongoDB

**Option A: Local MongoDB**
- Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Update `MONGODB_URI` in `backend/.env`

### 2. Backend Setup

```bash
cd backend
npm install
```

Update `.env` file if needed:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact-manager
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact-manager
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Get All Contacts
```
GET http://localhost:5000/api/contacts
```

### Create Contact
```
POST http://localhost:5000/api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello!"
}
```

### Get Single Contact
```
GET http://localhost:5000/api/contacts/:id
```

### Update Contact
```
PUT http://localhost:5000/api/contacts/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "9876543210",
  "message": "Updated message"
}
```

### Delete Contact
```
DELETE http://localhost:5000/api/contacts/:id
```

## Database Schema

```javascript
{
  name: String (required, trimmed),
  email: String (required, lowercase, validated),
  phone: String (required, 10 digits),
  message: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Usage

1. **Add Contact:** Fill out the form and click "Add Contact"
2. **View Contacts:** See all contacts in the list/table
3. **Sort Contacts:** Click column headers to sort (desktop view)
4. **Delete Contact:** Click "Delete" button and confirm

## Validation Rules

- **Name:** Required, cannot be empty
- **Email:** Required, must be valid email format
- **Phone:** Required, must be 10 digits
- **Message:** Optional

## Features Implemented

✅ Client-side validation  
✅ Server-side validation  
✅ Error handling  
✅ Success messages  
✅ Responsive design  
✅ Delete functionality  
✅ Sorting capability  
✅ Clean component structure  
✅ CORS enabled  
✅ Environment variables  

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

## Testing the API

You can test the API using:
- **Browser:** Visit `http://localhost:5000`
- **Postman:** Import the endpoints above
- **cURL:** Use command line requests

Example cURL:
```bash
# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890"}'

# Get all contacts
curl http://localhost:5000/api/contacts
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure IP whitelist is configured

### CORS Errors
- Verify backend is running on port 5000
- Check frontend is making requests to correct URL

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `API_URL` in `frontend/src/App.jsx`

## Future Enhancements

- Search functionality
- Edit contact feature
- Pagination for large datasets
- Export contacts (CSV/PDF)
- Contact categories/tags
- Authentication & authorization
- Image upload for contacts
- Email validation via API

## License

ISC

## Author

Gokul

---

**Note:** This project is built for demonstration of MERN stack fundamentals.
