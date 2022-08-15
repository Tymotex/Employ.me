if (!process.env.NODE_ENV) throw new Error('Cannot detect runtime environment type');

const apiConstants = {
    BASE_URL:
        process.env.NODE_ENV === 'development'
            ? `http://localhost:5555`
            : `https://api.employ.me.timz.dev`,
    GOOGLE_REDIRECT_URI:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5555/api/auth/googlelogin'
            : 'https://api.employ.me.timz.dev/api/auth/googlelogin',
};

export default apiConstants;
