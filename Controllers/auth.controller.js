import {
    loginUser,
    revokeToken
} from "../Services/auth.services.js";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN:", {
            email,
            passwordReceived: Boolean(password)
        });

        const result = await loginUser(email, password);

        return res.status(200).json(result);

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(401).json({
            message: error.message
        });
    }
};


export const logoutController = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        revokeToken(token);

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.error("LOGOUT ERROR:", error);

        return res.status(500).json({
            message: "Logout failed"
        });
    }
};
