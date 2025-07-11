// 'use client';

// import React, { useContext, useState } from 'react';
// import { AssistantContext } from '@/context/AssistantContext';
// import { AuthContext } from '@/context/AuthContext';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Loader2, Send } from 'lucide-react';
// import EmptyChatState from './EmptyChatState';
// import { useMutation, useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function ChatUI() {
//   const { assistant } = useContext(AssistantContext);
//   const { user } = useContext(AuthContext);

//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const storeMessage = useMutation(api.messages.storeMessage);
//   const messages = useQuery(api.messages.getMessages, {
//     userId: user?._id,
//     assistantId: assistant?._id,
//   });

//   const onSendMessage = async () => {
//     if (!input.trim() || !user || !assistant) return;

//     const prompt = input;
//     setInput('');
//     setLoading(true);

//     try {
//       // Store user message
//       await storeMessage({
//         sender: 'user',
//         text: prompt,
//         userId: user._id,
//         assistantId: assistant._id,
//       });

//       // Get AI response
//       const res = await fetch('/api/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt,
//           model: assistant.aiModelId || 'venice/uncensored:free',
//         }),
//       });

//       const data = await res.json();
//       const aiText = data.response || 'No response received.';

//       // Store AI response
//       await storeMessage({
//         sender: 'ai',
//         text: aiText,
//         userId: user._id,
//         assistantId: assistant._id,
//       });
//     } catch (err) {
//       console.error(err);
//       await storeMessage({
//         sender: 'ai',
//         text: '❌ Error contacting model.',
//         userId: user._id,
//         assistantId: assistant._id,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen justify-between">
//       <div className="p-6 overflow-y-auto flex-1 space-y-4">
//         {!messages || messages.length === 0 ? (
//           <EmptyChatState />
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-md max-w-[75%] ${
//                 msg.sender === 'user'
//                   ? 'ml-auto bg-primary text-white'
//                   : 'mr-auto bg-muted'
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex justify-between items-center gap-3 relative bottom-20 w-[94%] px-11">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
//           placeholder="Type your message..."
//           disabled={loading}
//         />
//         <Button onClick={onSendMessage} disabled={loading || !input.trim()}>
//           {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatUI;


// 'use client';

// import React, { useContext, useState } from 'react';
// import { AssistantContext } from '@/context/AssistantContext';
// import { AuthContext } from '@/context/AuthContext';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Loader2, Send, Trash2 } from 'lucide-react';
// import EmptyChatState from './EmptyChatState';
// import { useMutation, useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function ChatUI() {
//   const { assistant } = useContext(AssistantContext);
//   const { user } = useContext(AuthContext);

//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const storeMessage = useMutation(api.messages.storeMessage);
//   const clearMessages = useMutation(api.messages.clearMessages);

//   const messages = useQuery(api.messages.getMessages, {
//     userId: user?._id,
//     assistantId: assistant?._id,
//   });

//   const onSendMessage = async () => {
//     if (!input.trim() || !user || !assistant) return;

//     const prompt = input;
//     setInput('');
//     setLoading(true);

//     try {
//       // Store user message
//       await storeMessage({
//         sender: 'user',
//         text: prompt,
//         userId: user._id,
//         assistantId: assistant._id,
//       });

//       // Get AI response
//       const res = await fetch('/api/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt,
//           model: assistant.aiModelId || 'venice/uncensored:free',
//         }),
//       });

//       const data = await res.json();
//       const aiText = data.response || 'No response received.';

//       // Store AI response
//       await storeMessage({
//         sender: 'ai',
//         text: aiText,
//         userId: user._id,
//         assistantId: assistant._id,
//       });
//     } catch (err) {
//       console.error(err);
//       await storeMessage({
//         sender: 'ai',
//         text: '❌ Error contacting model.',
//         userId: user._id,
//         assistantId: assistant._id,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClearChat = async () => {
//     if (!user || !assistant) return;
//     const confirmed = window.confirm('Are you sure you want to clear this chat?');
//     if (!confirmed) return;

//     try {
//       await clearMessages({
//         userId: user._id,
//         assistantId: assistant._id,
//       });
//     } catch (err) {
//       console.error('Error clearing chat:', err);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen justify-between">
//       {/* Top: Clear Chat Button */}
//       <div className="flex justify-end px-6 pt-4">
//         <Button
//           variant="destructive"
//           onClick={onClearChat}
//           disabled={!messages?.length}
//           className="flex items-center gap-2"
//         >
//           <Trash2 className="w-4 h-4" />
//           Clear Chat
//         </Button>
//       </div>

//       {/* Chat Window */}
//       <div className="p-6 overflow-y-auto flex-1 space-y-4">
//         {!messages || messages.length === 0 ? (
//           <EmptyChatState />
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-md max-w-[75%] ${
//                 msg.sender === 'user'
//                   ? 'ml-auto bg-primary text-white'
//                   : 'mr-auto bg-muted'
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Chat Input */}
//       <div className="flex justify-between items-center gap-3 relative bottom-20 w-[94%] px-11">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
//           placeholder="Type your message..."
//           disabled={loading}
//         />
//         <Button onClick={onSendMessage} disabled={loading || !input.trim()}>
//           {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatUI;

'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AssistantContext } from '@/context/AssistantContext';
import { AuthContext } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send, Trash2 } from 'lucide-react';
import EmptyChatState from './EmptyChatState';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function ChatUI() {
  const { assistant } = useContext(AssistantContext);
  const { user } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const storeMessage = useMutation(api.messages.storeMessage);
  const deleteMessages = useMutation(api.messages.clearMessages);

  const messages = useQuery(api.messages.getMessages, {
    userId: user?._id,
    assistantId: assistant?._id,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages come
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSendMessage = async (messageText: string) => {
    if (!messageText.trim() || !user || !assistant) return;

    setLoading(true);
    setInput('');

    try {
      // Store user message
      await storeMessage({
        sender: 'user',
        text: messageText,
        userId: user._id,
        assistantId: assistant._id,
      });

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: messageText,
          model: assistant.aiModelId || 'venice/uncensored:free',
        }),
      });

      const data = await res.json();
      const aiText = data.response || 'No response received.';

      // Store AI response
      await storeMessage({
        sender: 'ai',
        text: aiText,
        userId: user._id,
        assistantId: assistant._id,
      });
    } catch (err) {
      console.error(err);
      await storeMessage({
        sender: 'ai',
        text: '❌ Error contacting model.',
        userId: user._id,
        assistantId: assistant._id,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) onSendMessage(input);
  };

  const handleSampleClick = (question: string) => {
    onSendMessage(question);
  };

  const handleClearChat = async () => {
    if (!user || !assistant) return;
    const confirmed = window.confirm('Are you sure you want to clear this chat?');
    if (!confirmed) return;
    
    try {
      await deleteMessages({ userId: user._id, assistantId: assistant._id });
    } catch (err) {
      console.error('Error clearing chat:', err);
    }
  };

  const hasMessages = messages && messages.length > 0;

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {!hasMessages ? (
          <EmptyChatState onSampleClick={handleSampleClick} />
        ) : (
          <>
            {messages.map((msg, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-md max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-primary text-white'
                    : 'mr-auto bg-muted'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex justify-between items-center gap-3 relative bottom-20 w-[94%] px-11">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            disabled={!hasMessages || loading}
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;