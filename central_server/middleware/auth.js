import fetch from "node-fetch";

export const auth = async (req, res, next) => {
  console.log("inside central server auth:\n",req.headers.authorization);
  try {
    const response = await fetch("http://localhost:4001/protected", {
      method: "POST",
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Unauthorized 1");
      throw new Error("Unauthorized");
    }

    const data = await response.json();
    console.log("data:", data);
    req.user = data.user; // Attach user data to the request
    next();
  } catch (error) {
    console.log(error);
    console.log("Unauthorized 2");
    res.status(401).json({ message: "Unauthorized 2" });
  }
};
