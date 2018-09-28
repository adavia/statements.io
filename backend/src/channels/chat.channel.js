import db from '../models';

const { Category, User, Message } = db.models;

const chatChannel = (io) => {
  io.of('/chat').on('connection', (socket) => {
    const { session } = socket.conn.request;
    const userId = session.passport.user;

    socket.on('join', async (categoryId) => {
      if (session.passport == null) {
        return;
      }
      
      try {
        const category = await Category.findByIdAndUpdate(categoryId, { 
          $addToSet: { users: userId }
        }, { new: true });
        const allUsers = await User.find({ _id: { $in: category.users }});
        const messages = await Message.find({ category: category.id }).populate('user');

        socket.join(category.id);     
        socket.emit('loadCategoryData', { messages, users: allUsers });
        socket.broadcast.to(category.id).emit('addNewUser', allUsers);
      } catch (error) {
        console.log(error)
      }
    });

    socket.on('leave', async (categoryId) => {
      try {
        const category = await Category.findByIdAndUpdate(categoryId, { 
          $pull: { users: userId }
        }, { new: true });
        const allUsers = await User.find({ _id: { $in: category.users }});

        socket.broadcast.to(category.id).emit('removeUser', allUsers);
        socket.leave(category.id);
      } catch (error) {
        console.log(error)
      }
    });

    socket.on('sendMessage', async (data) => {
      const newMessage = new Message();
      newMessage.content = data.message.content
      newMessage.category = data.id;
      newMessage.user = userId;
      const message = await newMessage.save();
      const savedMessage = await Message.populate(message, { path: 'user' });
      
      socket.emit('updateMessages', savedMessage);
      socket.broadcast.to(savedMessage.category).emit('updateMessages', savedMessage);
    });
  
    socket.on('disconnect', () => {
      const { categoryId } = socket.handshake.query;

			// Check if user exists in the session
			if (session.passport == null) {
				return;
      }

      socket.leave(categoryId);
		});
  });
}

// const addUser = async (userList, socket, userId) => {
//   const user = await User.findById(userId);
//   const serializedUser = user.toJSON();
//   userList[user.id] = { ...serializedUser, socket: socket.id };
// 	return userList;
// }

// const removeUser = (userList, userId) => {
//   let updatedList = Object.assign({}, userList);
// 	delete updatedList[userId];
// 	return updatedList;
// }

export default chatChannel;