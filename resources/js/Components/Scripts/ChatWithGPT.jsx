import axios from 'axios';

const ChatWithGPT = async (prompt) => {
    try {
        const response = await axios.post(route('chat.gpt'), { prompt });
        return response.data;
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
        throw error;
    }
};

export default ChatWithGPT;
