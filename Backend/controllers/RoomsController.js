const Room = require("../models/Rooms");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { name, rentPerDay, type, maxCount, description } = req.body;
    let amenities = [];

    // Parse amenities if present
    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch (e) {
        console.error("Error parsing amenities:", e);
      }
    }

    // Validate required fields
    if (!name || !rentPerDay || !type || !maxCount || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Handle images
    let images = [];

    // Add uploaded files
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    // Add image URLs if provided
    if (req.body.imageUrls) {
      const imageUrls = Array.isArray(req.body.imageUrls)
        ? req.body.imageUrls
        : [req.body.imageUrls];
      images = [...images, ...imageUrls];
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Create room
    const room = new Room({
      name: name.trim(),
      rentPerDay: parseFloat(rentPerDay),
      type: type.trim(),
      maxCount: parseInt(maxCount),
      description: description.trim(),
      amenities,
      images,
    });

    const savedRoom = await room.save();
    console.log("Room created with images:", savedRoom.images);

    res.status(201).json({
      success: true,
      data: savedRoom,
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: rooms,
      count: rooms.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
      message: "Room updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get available rooms
const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true });

    // Transform the rooms to ensure complete image URLs
    const transformedRooms = rooms.map((room) => ({
      ...room._doc,
      images: room.images.map((image) => {
        // If the image URL is already complete, return it
        if (image.startsWith("http")) {
          return image;
        }
        // Otherwise, construct the complete Cloudinary URL
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${image}`;
      }),
    }));

    res.status(200).json({
      success: true,
      data: transformedRooms,
      count: transformedRooms.length,
    });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update room images
const updateRoomImages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { imageUrls } = req.body;

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of image URLs",
      });
    }

    const room = await Room.findByIdAndUpdate(
      roomId,
      { images: imageUrls },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
      message: "Room images updated successfully",
    });
  } catch (error) {
    console.error("Error updating room images:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
  updateRoomImages,
};
