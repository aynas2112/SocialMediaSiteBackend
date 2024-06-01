import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import ChatList from './components/ChatList/ChatList';
import { Container, Paper, Box } from '@mui/material';
function App() {
  const [chats, setChats] = useState([]);

  // Fetch chats from API or database

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <SearchBar />
        </Box>
        <ChatList chats={chats} />
      </Paper>
    </Container>
  );
}

export default App;

