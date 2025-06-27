import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Alert } from '@mui/material';
import { User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box maxWidth={500} mx="auto" p={2}>
      <Typography variant="h5" gutterBottom>User List</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} divider>
            <ListItemAvatar>
              <Avatar src={user.avatar} alt={user.name}>
                {user.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
