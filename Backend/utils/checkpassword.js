import bcrypt from 'bcrypt';

const checkpassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}

export default checkpassword;