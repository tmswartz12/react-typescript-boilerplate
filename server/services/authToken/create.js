const jwt = require('jsonwebtoken');
const { AuthToken } = require('../../db');

function stringFromUserAgent(useragent) {
  return `${useragent.isMobile ? 'Mobile' : ''} ${useragent.browser}`;
}


const create = async(user, useragent) => {
  const authToken = new AuthToken({
    userId: user._id,
    userAgent: stringFromUserAgent(useragent),
  });

  const savedToken = await authToken.save();

  const jwtToken = jwt.sign(
    { id: user._id, did: authToken._id },
    process.env.JWT_SECRET,
    {
      expiresIn: 31536e3,
    }
  );
  console.log('HERE IS THE JWT', jwtToken);
  return jwtToken;
};

module.exports = { create }
;
