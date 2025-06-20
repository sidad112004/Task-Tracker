import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Conversation({ props: messagetrackid }) {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userdata?.id);
  const user= useSelector((state) => state.auth.userdata);
  const [messages, setMessages] = useState([]);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/message/${messagetrackid}`);
        const data = response.data.status.data || [];
        setMessages(data);

        
        const chatStatus = response?.data?.status?.chatActive;
        if (typeof chatStatus === 'boolean') {
          setChatEnabled(chatStatus);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || 'You are not authorized to view this conversation'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [messagetrackid]);
  
  console.log(user);


  const handleToggleChat = async () => {
    setToggling(true);
    try {
      const response = await axios.post('/api/message/chatactive', {
        messagetrackid,
        val: !chatEnabled,
      });

      const serverStatus = response?.data?.status?.data?.chatActive;

      if (typeof serverStatus === 'boolean') {
        setChatEnabled(() => serverStatus); // ✅ use callback form
        toast.success(`Chat ${serverStatus ? 'enabled' : 'disabled'} successfully`);
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error toggling chat');
    } finally {
      setToggling(false);
    }
  };


  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const response = await axios.post('/api/message/create', {
        messagetrackid,
        content: newMessage,
      });

      if (response.data.status.success) {
        const newMsg = response.data.status.data;
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage('');
        toast.success('Message sent');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error sending message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center py-4">Loading conversation...</p>;

  return (
    <div className="bg-base-100 p-4 border border-base-300 rounded-md">
      {(role === 'ADMIN' || role === 'EXPERT') && (
        <div className="mb-4 text-center">
          <button
            className={`btn ${chatEnabled ? 'btn-error' : 'btn-success'} btn-sm`}
            onClick={handleToggleChat}
            disabled={toggling}
          >
            {toggling ? 'Updating...' : chatEnabled ? 'Disable Chat' : 'Enable Chat'}
          </button>
        </div>
      )}

      <div className="space-y-3 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`chat ${msg.fromId === userId ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-bubble bg-base-200">
                <p>{msg.content}</p>
                <div className="text-xs text-right text-gray-500">
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages in this conversation.</p>
        )}
      </div>

      {chatEnabled && (
        <div className="flex gap-2 pt-4">
          <input
            type="text"
            placeholder="Type a message"
            className="input input-bordered w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={sending}
          />
          <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            disabled={sending}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Conversation;
