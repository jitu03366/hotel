# 🏨 Royal Hotel Booking Application

A modern, full-stack hotel booking application built with React.js, Node.js, Express, MongoDB, and integrated with Razorpay payment gateway.

## ✨ Features

### 🎨 Enhanced UI/UX
- **Modern Design**: Beautiful gradient backgrounds, smooth animations, and responsive layouts
- **Interactive Components**: Hover effects, loading animations, and smooth transitions
- **Mobile-First**: Fully responsive design that works on all devices
- **Accessibility**: Keyboard navigation and screen reader friendly

### 💳 Payment Integration
- **Razorpay Gateway**: Secure payment processing with multiple payment options
- **Multiple Payment Methods**: 
  - Credit/Debit Cards
  - UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Net Banking
  - Digital Wallets
  - Cash on Delivery (COD)
- **Payment Verification**: Secure signature verification for all transactions
- **Real-time Status**: Live payment status updates

### 🏨 Hotel Management
- **Room Booking**: Easy room selection and booking process
- **Availability Check**: Real-time room availability checking
- **Booking Management**: Complete booking lifecycle management
- **User Profiles**: User account management and booking history

### 🔐 Security
- **JWT Authentication**: Secure user authentication
- **Password Encryption**: bcrypt for secure password hashing
- **Payment Security**: Razorpay's secure payment processing
- **Data Validation**: Input validation and sanitization

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay Account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hotel-booking.git
   cd hotel-booking
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

4. **Environment Configuration**
   
   **Backend (.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/hotel_booking
   JWT_SECRET=your_super_secret_jwt_key_here
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   PORT=5000
   ```

   **Frontend (.env):**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Bootstrap** - CSS framework
- **Axios** - HTTP client
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing

### DevOps & Tools
- **Cloudinary** - Image storage and management
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
hotel-booking/
│
├── Backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── AdminController.js    # Admin operations
│   │   ├── BookingController.js  # Booking management
│   │   ├── PaymentController.js  # Payment processing
│   │   ├── RoomsController.js    # Room management
│   │   └── UserController.js     # User management
│   ├── middleware/
│   │   ├── Authentication.js     # Auth middleware
│   │   └── upload.js            # File upload middleware
│   ├── models/
│   │   ├── Admin.js             # Admin model
│   │   ├── Booking.js           # Booking model
│   │   ├── PaymentModel.js      # Payment model
│   │   ├── Rooms.js             # Room model
│   │   └── UserModel.js         # User model
│   ├── routes/
│   │   ├── AdminRoute.js        # Admin routes
│   │   ├── BookingRoute.js      # Booking routes
│   │   ├── PaymentRoute.js      # Payment routes
│   │   ├── RoomsRoute.js        # Room routes
│   │   └── UserRoute.js         # User routes
│   ├── utils/
│   │   └── cloudinary.js        # Cloudinary config
│   ├── .env.example             # Environment template
│   ├── package.json
│   └── server.js                # Entry point
│
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── About/           # About section
│   │   │   ├── BookNow/         # Booking form
│   │   │   ├── Contact/         # Contact section
│   │   │   ├── Features/        # Features showcase
│   │   │   ├── Footer/          # Footer component
│   │   │   ├── Gallery/         # Image gallery
│   │   │   ├── Navbar/          # Navigation bar
│   │   │   ├── Rooms/           # Rooms display
│   │   │   └── Showcase/        # Hero section
│   │   ├── context/
│   │   │   ├── StateProvider.js # Global state
│   │   │   └── reducer.js       # State reducer
│   │   ├── pages/
│   │   │   ├── Admin/           # Admin dashboard
│   │   │   ├── Payment/         # Payment processing
│   │   │   ├── Login/           # User authentication
│   │   │   └── UserDetails/     # User profile
│   │   ├── style/               # CSS and assets
│   │   ├── App.js              # Main app component
│   │   ├── axios.js            # API configuration
│   │   └── index.js            # Entry point
│   ├── .env.example            # Environment template
│   └── package.json
│
├── RAZORPAY_SETUP.md           # Payment setup guide
└── README.md                   # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create new room (admin)
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)

### Bookings
- `POST /api/booking/create` - Create new booking
- `GET /api/booking/:id` - Get booking details
- `GET /api/booking/user/:userId` - Get user bookings
- `PUT /api/booking/:id` - Update booking status

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment signature
- `POST /api/payment/cod` - Process cash on delivery

## 💡 Key Improvements Made

### 🎨 UI/UX Enhancements
1. **Modern Design System**
   - Gradient backgrounds and modern color schemes
   - Consistent spacing and typography
   - Interactive hover effects and animations

2. **Enhanced Navigation**
   - Smooth scroll navigation
   - Mobile-friendly hamburger menu
   - Fixed header with scroll effects

3. **Improved Forms**
   - Better form validation and feedback
   - Loading states and progress indicators
   - Enhanced error handling

4. **Payment Interface**
   - Beautiful payment method selection
   - Real-time payment status updates
   - Secure Razorpay integration

### 🔧 Technical Improvements
1. **Payment Integration**
   - Complete Razorpay implementation
   - Multiple payment method support
   - Secure payment verification

2. **Error Handling**
   - Comprehensive error boundaries
   - User-friendly error messages
   - Graceful fallbacks

3. **Performance**
   - Optimized component rendering
   - Lazy loading for images
   - Efficient state management

## 🧪 Testing

### Test Payment Credentials
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **UPI ID**: success@razorpay

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is configured
3. Deploy the backend application

### Frontend Deployment (Netlify/Vercel)
1. Build the React application: `npm run build`
2. Set environment variables for production
3. Deploy the build folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue in this repository
- Contact: your-email@example.com

## 🎯 Future Enhancements

- [ ] Email notifications for bookings
- [ ] SMS integration
- [ ] Advanced search and filtering
- [ ] Loyalty program
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Advanced analytics dashboard
- [ ] Integration with Google Maps
- [ ] Social media login
- [ ] Review and rating system

---

Made with ❤️ for modern hotel management