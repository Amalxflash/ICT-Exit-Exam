import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Container, Box, Typography } from '@mui/material';

function OtpForm({ onSubmit }) {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(''); // Reset error state before submission
        try {
            await onSubmit(otp);
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Invalid OTP. Please try again.'); // Set error message if verification fails
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '180px' }}>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Enter your 6-digit OTP
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Enter OTP"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        inputProps={{ maxLength: 6 }}
                        helperText={error || "Please enter a 6-digit OTP"}
                        error={!!error} // Set error state based on error message presence
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

export default OtpForm;
