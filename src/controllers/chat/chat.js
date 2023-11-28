import { Case, Lawyer, Client, CHAT } from '../../models';


export const createChat = async (req, res) => {
    try {
        const { message, caseId } = req.body;

        // Assume you have some mechanism to get user information from authentication
        const userId = req.user.id;
        const userRole = req.user.role; // Assuming 'client' or 'lawyer'

        let sender;

        // Dynamically determine the sender based on the user's role
        if (userRole === 'client') {
            // Check if the client is associated with the case
            const isClientAssociated = await Client.exists({ userId, cases: caseId });
            if (!isClientAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else if (userRole === 'lawyer') {
            // Check if the lawyer is associated with the case
            const isLawyerAssociated = await Lawyer.exists({ userId, cases: caseId });
            if (!isLawyerAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else {
            // Handle other roles if needed
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Save the chat message to the database
        const chat = await CHAT.create({
            message,
            sender,
            caseId,
        });

        // Access the Socket.io instance from the app
        const io = req.app.get('io');

        // Get all lawyers and clients associated with the case from your database
        const lawyersAndClientsInCase = await Promise.all([
            Lawyer.find({ cases: caseId }),
            Client.find({ cases: caseId }),
        ]);

        // Emit the chat message to all lawyers and clients involved using Socket.io
        lawyersAndClientsInCase.flat().forEach(user => {
            const userSocket = io.sockets.sockets[user.userId];

            if (userSocket) {
                userSocket.emit('chatMessage', chat);
            }
        });

        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getChats = async (req, res) => {
    try {
        const { caseId } = req.params;

        // Assume you have some mechanism to get user information from authentication
        const userId = req.user.id;
        const userRole = req.user.role; // Assuming 'client' or 'lawyer'

        // Dynamically determine the sender based on the user's role
        let sender;

        if (userRole === 'client') {
            // Check if the client is associated with the case
            const isClientAssociated = await Client.exists({ userId, cases: caseId });
            if (!isClientAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else if (userRole === 'lawyer') {
            // Check if the lawyer is associated with the case
            const isLawyerAssociated = await Lawyer.exists({ userId, cases: caseId });
            if (!isLawyerAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else {
            // Handle other roles if needed
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Get the chats from the database
        const chats = await CHAT.find({ caseId, sender });

        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteChat = async (req, res) => {
    try {
        const { id, caseId } = req.params;

        // Assume you have some mechanism to get user information from authentication
        const userId = req.user.id;
        const userRole = req.user.role; // Assuming 'client' or 'lawyer'

        // Dynamically determine the sender based on the user's role
        let sender;

        if (userRole === 'client') {
            // Check if the client is associated with the case
            const isClientAssociated = await Client.exists({ userId, cases: caseId });
            if (!isClientAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else if (userRole === 'lawyer') {
            // Check if the lawyer is associated with the case
            const isLawyerAssociated = await Lawyer.exists({ userId, cases: caseId });
            if (!isLawyerAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else {
            // Handle other roles if needed
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the chat from the database
        const deletedChat = await CHAT.findByIdAndDelete(id);
        if (!deletedChat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        // Access the Socket.io instance from the app
        const io = req.app.get('io');

        // Get all lawyers and clients associated with the case from your database
        const lawyersAndClientsInCase = await Promise.all([
            Lawyer.find({ cases: caseId }),
            Client.find({ cases: caseId }),
        ]);

        // Emit the chat message to all lawyers and clients involved using Socket.io
        lawyersAndClientsInCase.flat().forEach(user => {
            const userSocket = io.sockets.sockets[user.userId];

            if (userSocket) {
                userSocket.emit('chatMessageDeleted', deletedChat);
            }
        });

        res.status(200).json(deletedChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id, caseId } = req.params;

        // Assume you have some mechanism to get user information from authentication
        const userId = req.user.id;
        const userRole = req.user.role; // Assuming 'client' or 'lawyer'

        // Dynamically determine the sender based on the user's role
        let sender;

        if (userRole === 'client') {
            // Check if the client is associated with the case
            const isClientAssociated = await Client.exists({ userId, cases: caseId });
            if (!isClientAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else if (userRole === 'lawyer') {
            // Check if the lawyer is associated with the case
            const isLawyerAssociated = await Lawyer.exists({ userId, cases: caseId });
            if (!isLawyerAssociated) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            sender = userId;
        } else {
            // Handle other roles if needed
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the message from the chat in the database
        const deletedChat = await CHAT.findByIdAndUpdate(id, {
            message: 'This message was deleted',
        }, 
        { new: true });
        if (!deletedChat) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};