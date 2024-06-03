import ChatItem from "./ChatItem";
import { List } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
const query = gql`
  query getChats {
    getChats {
      id
      cname
      createdAt
    }
  }
`;
interface Chat {
  id: string;
  name: string;
  timestamp: string;
}

function ChatList() {
  const { data, loading } = useQuery(query);
  if (loading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <>
    {console.log(data)}
    <List>
      {data.getChats.map((chat: any) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </List>
    </>
  );
}

export default ChatList;
