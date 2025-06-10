const STATIC_TOKEN = 'token-static-123';

const tokenAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    if (token !== STATIC_TOKEN) {
        return res.status(403).json({ error: 'Invalid token' });
    }

    next();
};

export default tokenAuth;