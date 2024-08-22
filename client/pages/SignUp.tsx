
import React from 'react';
import { Box, Typography, Paper, Avatar, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth_Service';
const schema = z.object({
  firstName: z.string().min(1, 'First name is a required field'),
  lastName: z.string().min(1, 'Surname is a required field'),
  username: z.string().min(1, 'Username is a required field'),
  email: z.string().email('Invalid email address').min(1, 'Email is a required field'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
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

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data : FormData) => {
    try {
      await registerUser(data);
      alert('ההרשמה הצליחה!');
      navigate('/dashbourd');
    } catch (error) {
      alert('שגיאה בהרשמה');
    }
  };

  return (
    <Container>
      <FormWrapper elevation={3}>
        <Avatar style={{ backgroundColor: '#1976d2', marginBottom: '20px' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          הרשמה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            fullWidth 
            label="last name" 
            variant="outlined" 
            margin="normal"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField 
            fullWidth 
            label="last name" 
            variant="outlined" 
            margin="normal"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
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
            label="email" 
            variant="outlined" 
            margin="normal"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <StyledButton variant="contained" fullWidth type="submit">
            הרשמה
          </StyledButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
