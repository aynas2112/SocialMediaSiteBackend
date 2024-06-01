import ChatItem from "./ChatItem";
import { List } from '@mui/material';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: number;
}

function ChatList({ chats }: { chats: Chat[] }) {
  return (
    <List>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </List>
  );
}

export default ChatList;
