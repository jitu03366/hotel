# Environment Variables for Hotel Booking Application

## Backend Environment Variables (.env)

### Database Configuration
```
MONGODB_URI=mongodb://localhost:27017/hotel_booking
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking
```

### JWT Configuration
```
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### Razorpay Configuration
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### Cloudinary Configuration (for image uploads)
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Server Configuration
```
PORT=5000
NODE_ENV=development
```

## Frontend Environment Variables (.env)

### API Configuration
```
REACT_APP_API_URL=http://localhost:5000
```

### Razorpay Configuration (Public Key)
```
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

## How to Set Up Razorpay

1. **Create a Razorpay Account:**
   - Go to https://razorpay.com/
   - Sign up for a new account
   - Complete the verification process

2. **Get API Keys:**
   - Log in to your Razorpay Dashboard
   - Go to Settings > API Keys
   - Generate new API keys for testing
   - Copy the Key ID and Key Secret

3. **Test vs Live Mode:**
   - For development, use test keys (rzp_test_...)
   - For production, use live keys (rzp_live_...)
   - Test keys don't process real payments

4. **Configure Webhooks (Optional):**
   - Go to Settings > Webhooks
   - Add webhook URL: https://yourdomain.com/api/payment/webhook
   - Select events: payment.captured, payment.failed

## Sample .env Files

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/hotel_booking
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_1234567890abcdef
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcdef
```

## Security Notes

1. **Never commit .env files to version control**
2. **Use different keys for development and production**
3. **Keep your Razorpay secret key absolutely private**
4. **Regularly rotate your API keys**
5. **Use webhook signatures to verify authenticity**

## Testing Razorpay Integration

### Test Card Details (for testing purposes only):
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **Name:** Any name

### Test UPI ID:
- **UPI ID:** success@razorpay

### Test Wallet:
- Use the test wallet option in Razorpay checkout

## Payment Flow

1. User selects items and proceeds to payment
2. Frontend calls `/api/payment/create-order` with booking details
3. Backend creates Razorpay order and returns order details
4. Frontend opens Razorpay checkout with order details
5. User completes payment on Razorpay
6. Razorpay calls success handler with payment details
7. Frontend calls `/api/payment/verify` to verify payment signature
8. Backend verifies signature and updates booking status
9. User is redirected to success/receipt page

## Troubleshooting

1. **Razorpay script not loading:**
   - Check internet connection
   - Verify Razorpay CDN is accessible
   - Check browser console for errors

2. **Payment verification fails:**
   - Verify webhook signatures
   - Check Razorpay secret key
   - Ensure proper HMAC verification

3. **Orders not creating:**
   - Verify API keys are correct
   - Check amount is in correct format (paise)
   - Ensure required fields are present

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Node.js SDK](https://github.com/razorpay/razorpay-node)
- [Razorpay Checkout Documentation](https://razorpay.com/docs/checkout/)