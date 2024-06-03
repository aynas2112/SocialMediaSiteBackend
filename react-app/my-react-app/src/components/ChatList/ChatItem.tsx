import { ListItem, ListItemText, ListItemSecondaryAction, Button,Typography } from '@mui/material';

interface Chat {
  id: string;
  cname: string;
  createdAt: string;
}

function ChatItem({ chat }: { chat: Chat }) {
  const onDelete = (id: string) => {
    console.log('Delete chat with ID:', id);
  };

  return (
    <ListItem>
      <ListItemText
        primary={chat.cname}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              "lorem ipsum wala msg"
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <Typography variant="caption" color="text.secondary">
          {chat.createdAt}
        </Typography>
        <Button  aria-label="delete" variant="contained" color="primary" onClick={() => onDelete(chat.id)}> DELETE
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ChatItem;
