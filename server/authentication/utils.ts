import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const PRIV_KEY = fs.readFileSync(path.resolve("id_rsa_priv.pem"));

export const issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = 86400; // 24 hours

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};
