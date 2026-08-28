import { loginUser } from "../Services/auth.services.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN:", {
      email,
      passwordReceived: !!password,
    });

    const result = await loginUser(email, password);

    res.json(result);
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(401).json({
      message: error.message,
    });
  }
};
