const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// REGISTER
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (users.find(u => u.username === username)) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, email, password, habits: [] });
    res.json({ message: "Registered successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) return res.json({ message: "Invalid credentials" });

    res.json({ message: "Login success", username });
});

// FORGOT PASSWORD (simple version)
app.post("/forgot", (req, res) => {
    const { username, email } = req.body;

    const user = users.find(
        u => u.username === username && u.email === email
    );

    if (!user) return res.json({ message: "User not found" });

    res.json({ message: "User verified. You can change password." });
});

// CHANGE PASSWORD
app.post("/change-password", (req, res) => {
    const { username, newPassword } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) return res.json({ message: "User not found" });

    user.password = newPassword;
    res.json({ message: "Password updated successfully" });
});

// HABITS
app.get("/habits/:username", (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    res.json(user ? user.habits : []);
});

app.post("/habits/:username", (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    user.habits.push(req.body);
    res.json({ message: "Added" });
});

app.put("/habits/:username/:i", (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    user.habits[req.params.i] = req.body;
    res.json({ message: "Updated" });
});

app.delete("/habits/:username/:i", (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    user.habits.splice(req.params.i, 1);
    res.json({ message: "Deleted" });
});

app.listen(5001, () => console.log("Server running on 5001"));
