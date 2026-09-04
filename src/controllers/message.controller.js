import Message from '../modules/message.module.js'


const sendMessageController = async (req, res) => {
    const { conversationId, receiverId, content } = req.body

    try {
        const senderId = req.user.id

        if (!conversationId || !receiverId || !content) {
            return res.status(400).json({
                success: false,
                message: 'conversationId, receiverId, and content are required'
            })
        }
        const newMessage = new Message({
            conversation: conversationId,
            sender: senderId,
            receiver: receiverId,
            content: content

        })
        await newMessage.save()
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error sending message'
        })
    }
}

const getMessageController = async (req, res) => {
    try {
        const { conversationId } = req.params
        const messages = await Message.find({
            conversation: conversationId
        })
            .populate('sender', 'name')
            .populate('receiver', 'name')
            .sort({ createdAt: 1 })
        
        res.status(200).json({
            messages
        })
    } catch (error) {
        console.error('Error retrieving messages:', error)
        res.status(500).json({
            message:'Failed to retrieve messages'
        })
    }

}

export { sendMessageController, getMessageController };