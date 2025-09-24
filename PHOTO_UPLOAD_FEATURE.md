# Photo Upload Feature Documentation

## Overview
The photo upload feature has been successfully implemented for both Create Room and Edit Room pages. This feature allows users to upload multiple images directly to Cloudinary with a modern drag-and-drop interface.

## Features Implemented

### ✅ ImageUpload Component
- **Location:** `Frontend/src/components/ImageUpload/ImageUpload.js`
- **Styling:** `Frontend/src/components/ImageUpload/ImageUpload.css`

#### Key Features:
1. **Drag & Drop Interface**
   - Modern drag-and-drop zone with visual feedback
   - Hover effects and animations
   - Click to browse files

2. **Multiple Image Upload**
   - Upload up to 10 images per room
   - Support for JPEG, PNG, and WebP formats
   - 5MB file size limit per image

3. **Image Preview Grid**
   - Thumbnail previews of uploaded images
   - Individual remove buttons for each image
   - Image numbering system

4. **Progress Tracking**
   - Upload progress indicators
   - Loading states and animations
   - Error handling and user feedback

5. **Validation**
   - File type validation
   - File size validation
   - Maximum image count validation

### ✅ Updated Components

#### CreateRoom Component
- **File:** `Frontend/src/pages/Admin/Rooms/CreateRoom.js`
- **Changes:**
  - Replaced textarea with ImageUpload component
  - Updated form data structure to use array for images
  - Added image change handler
  - Updated validation logic

#### EditRoom Component
- **File:** `Frontend/src/pages/Admin/Rooms/EditRoom.js`
- **Changes:**
  - Replaced textarea with ImageUpload component
  - Updated form data structure to use array for images
  - Added image change handler
  - Updated validation logic
  - Properly loads existing images for editing

## Backend Integration

### Upload Routes
- **File:** `Backend/routes/UploadRoute.js`
- **Endpoints:**
  - `POST /api/upload/multiple` - Upload multiple images
  - `POST /api/upload/single` - Upload single image
  - `DELETE /api/upload/:publicId` - Delete image from Cloudinary

### Cloudinary Configuration
- **File:** `Backend/Middleware/upload.js`
- **Settings:**
  - Folder: "royal-hotel"
  - Allowed formats: jpg, png, jpeg, webp
  - Automatic optimization and transformation

## How to Use

### For Administrators

1. **Creating a New Room:**
   - Navigate to Admin → Rooms → Add Room
   - Fill in room details
   - Use the "Room Images" section to upload photos
   - Drag and drop images or click to browse
   - Preview uploaded images before saving

2. **Editing an Existing Room:**
   - Navigate to Admin → Rooms → Edit Room
   - Existing images will be displayed
   - Add new images or remove existing ones
   - Save changes to update the room

### Technical Usage

```jsx
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

// In your component
const [images, setImages] = useState([]);

<ImageUpload
  images={images}
  onImagesChange={setImages}
  maxImages={10}
  disabled={false}
  className=""
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array | `[]` | Array of image URLs |
| `onImagesChange` | Function | Required | Callback when images change |
| `maxImages` | Number | `10` | Maximum number of images allowed |
| `disabled` | Boolean | `false` | Disable the upload component |
| `className` | String | `""` | Additional CSS classes |

## Styling

The component includes comprehensive CSS with:
- Responsive design for mobile and desktop
- Modern animations and transitions
- Error and success states
- Accessibility features
- Print-friendly styles

## Error Handling

The component handles various error scenarios:
- Invalid file types
- File size exceeding limits
- Network upload failures
- Maximum image count exceeded
- Cloudinary upload errors

## Browser Support

- Modern browsers with File API support
- Drag and drop functionality
- Image preview capabilities
- Mobile touch support

## Security Features

- File type validation on both client and server
- File size limits to prevent abuse
- Secure upload to Cloudinary
- Authentication required for uploads

## Performance Optimizations

- Lazy loading of image previews
- Optimized image compression via Cloudinary
- Efficient re-rendering with React hooks
- Minimal bundle size impact

## Testing

To test the photo upload feature:

1. **Start the development server:**
   ```bash
   cd Frontend
   npm start
   ```

2. **Start the backend server:**
   ```bash
   cd Backend
   npm start
   ```

3. **Test the functionality:**
   - Navigate to Admin → Rooms → Add Room
   - Try uploading images via drag & drop
   - Try uploading images via click to browse
   - Test image removal
   - Test validation (file size, type, count)

## Troubleshooting

### Common Issues:

1. **Images not uploading:**
   - Check Cloudinary configuration
   - Verify backend server is running
   - Check network connectivity

2. **File size errors:**
   - Ensure images are under 5MB
   - Compress images if needed

3. **File type errors:**
   - Only JPEG, PNG, and WebP are supported
   - Convert other formats before uploading

4. **Maximum images exceeded:**
   - Remove existing images before adding new ones
   - Current limit is 10 images per room

## Future Enhancements

Potential improvements for future versions:
- Image cropping and editing tools
- Bulk image operations
- Image sorting and reordering
- Advanced image optimization
- Image metadata editing
- Batch upload progress tracking

## Support

For technical support or questions about the photo upload feature, please refer to the development team or check the component documentation.
