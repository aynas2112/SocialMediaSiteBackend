import { ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: number;
}

function ChatItem({ chat }: { chat: Chat }) {
  return (
    <ListItem>
      <ListItemText
        primary={chat.name}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              {chat.lastMessage}
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <Typography variant="caption" color="text.secondary">
          {new Date(chat.timestamp).toLocaleString()}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ChatItem;
