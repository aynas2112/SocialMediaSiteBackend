import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ChatList from "./components/ChatList/ChatList";
import { Container, Paper, Box, Button,TextField, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";


const create_chat = gql`
  mutation CreateChat($cname: String!, $createdAt: String) {
    createChat(cname: $cname, createdAt: $createdAt)
  }
`;

function App() {

  const [cname, setCname] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [createChat, { data, loading, error }] = useMutation(create_chat);

  const handleCreateChat = (e:any) => {
    e.preventDefault();
    createChat({ variables: { cname, createdAt } });
    setCname('');
    setCreatedAt('');
  };
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <Router>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <SearchBar />
        </Box>
        <ChatList />
        <form onSubmit={handleCreateChat}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Create New Chat</Typography>
          <TextField
            fullWidth
            label="Chat Name"
            variant="outlined"
            value={cname}
            onChange={(e) => setCname(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Created At"
            variant="outlined"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Chat
          </Button>
        </form>
      </Paper>
    </Container>
        <div className='router'>
          <Routes>
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </Router>  
  );

}

export default App;
