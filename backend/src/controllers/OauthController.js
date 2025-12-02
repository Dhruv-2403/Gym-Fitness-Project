import { OAuth2Client } from 'google-auth-library';
import prisma from '../../prisma/client.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'dev-fitfusion-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function googleLogin(req, res) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Google token is required' });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        if (!email) {
            return res.status(400).json({ error: 'Email not provided by Google' });
        }


        let user = await prisma.user.findUnique({
            where: { user_email: email.toLowerCase() },
        });


        if (!user) {
            user = await prisma.user.create({
                data: {
                    user_name: name || email.split('@')[0],
                    user_email: email.toLowerCase(),
                    user_password: '',
                },
            });
        }


        const jwtToken = jwt.sign({ user_id: user.user_id }, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.json({
            message: 'Google login successful',
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
            },
            token: jwtToken,
        });
    } catch (err) {
        console.error('Google OAuth error:', err);
        res.status(500).json({ error: 'Authentication failed' });
    }
}

