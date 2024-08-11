import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Container, Box, Typography } from '@mui/material';

function EmailForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log('Submitting email:', email);
            const response = await axios.post('http://localhost:3001/send-otp', { email });
            console.log('Response from server:', response.data);
            onSubmit(email);
        } catch (error) {
            console.error('Error submitting email:', error.response?.data || error.message);
            onSubmit(email, error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '180px' }}>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Enter your email for OTP verification
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default EmailForm;
