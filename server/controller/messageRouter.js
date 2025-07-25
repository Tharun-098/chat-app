import Message from "../model/messages.js";
import User from "../model/user.js";
import cloudinary from "cloudinary";
import { io, userSocketMap } from "../server.js";
export const getAllUsersExcept = async (req, res) => {
  try {
    const userid = req.userId;
    const filteredUsers = await User.find({ _id: { $ne: userid } }).select('-password');
    const unseenmessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderid: user._id,
        receiverid: userid,
        seen: false,
      });
      if (messages) {
        unseenmessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    return res.json({ success: true, user: filteredUsers, unseenmessages });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const selectUserMessages = async (req, res) => {
  try {
    const { id: selectId } = req.params;
    const userId = req.userId;
    const messages = await Message.find({
      $or: [
        { senderid: selectId, receiverid: userId },
        { senderid: userId, receiverid: selectId },
      ],
    });
    await Message.updateMany(
      { senderid: selectId, receiverid: userId },
      { seen: true }
    );
    return res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const readMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverid = req.params.id;
    const senderid = req.userId;

    let imgurl;

    // Upload image to Cloudinary if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imgurl = result.secure_url;
    }

    // Create new message
    const newmessage = await Message.create({
      senderid,
      receiverid,
      text,
      image: imgurl,
    });

    // Emit to receiver if online
    const receiverSocketId = userSocketMap[receiverid];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newmessage", newmessage);
    }

    return res.json({ success: true, newmessage });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
