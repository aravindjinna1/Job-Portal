import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED for Render (HTTPS)
      sameSite: "None",  // REQUIRED for Vercel ↔ Render
      expires: new Date(
        Date.now() +
          process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      user,
    });
};
