import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

app.get("/reset-password", async (req, res) => {
  const hash = await bcrypt.hash("admin123", 10);

  await Admin.updateOne(
    { email: "admin@alabraz.com" },
    { password: hash }
  );

  res.send("Password updated");
});