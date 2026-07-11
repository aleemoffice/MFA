// engine.auth.js — ROLE-BASED AUTH ENGINE (ES MODULE)

export const AUTH = {
  users: [
    {
      username: "Admin",
      password: "a1b2c3d4",
      role: "admin",
      hint: "Default admin password: a1b2c3d4"
    }
  ],

  currentUser: null,

  login(username, password) {
    const user = this.users.find(u => u.username === username);
    if (!user) return { ok: false, msg: "User not found." };

    if (user.password !== password) {
      return { ok: false, msg: "Invalid password." };
    }

    this.currentUser = { username: user.username, role: user.role };
    this.persistSession();
    return { ok: true, msg: "Login successful.", user: this.currentUser };
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem("MFA_AUTH_SESSION");
  },

  loadSession() {
    const raw = localStorage.getItem("MFA_AUTH_SESSION");
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      this.currentUser = session;
      return session;
    } catch {
      return null;
    }
  },

  persistSession() {
    if (!this.currentUser) return;
    localStorage.setItem("MFA_AUTH_SESSION", JSON.stringify(this.currentUser));
  },

  isLoggedIn() {
    return !!this.currentUser;
  },

  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  }
};
