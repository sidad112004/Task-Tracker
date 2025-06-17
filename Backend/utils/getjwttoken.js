import jwt from 'jsonwebtoken';

const getJwtToken = (user_id) => {
    return jwt.sign(
        {
            id:user_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
}

export default getJwtToken;