import React from 'react';
import { Box, Typography, Paper, Avatar, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth_Service'; 

const schema = z.object({
  username: z.string().min(1, 'Username is a required field'),
  password: z.string().min(1, 'Password is a required field'),
});

type FormData = z.infer<typeof schema>;

const Container = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
});

const FormWrapper = styled(Paper)({
  padding: '40px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
});

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data); 
        navigate('/dashbourd');
        alert('success');
    } catch (error) {
      alert('failure');
    }
  };

  return (
    <Container>
      <FormWrapper elevation={3}>
        <Avatar style={{ backgroundColor: '#1976d2', marginBottom: '20px' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          התחברות
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            fullWidth 
            label="user name" 
            variant="outlined" 
            margin="normal"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField 
            fullWidth 
            label="password" 
            variant="outlined" 
            margin="normal"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <StyledButton variant="contained" fullWidth type="submit" >
          connect
          </StyledButton>
        </form>
        <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
        Don't have an account? <a href="/signin">Register here</a>
        </Typography>
      </FormWrapper>
    </Container>
  );
};

export default Login;



