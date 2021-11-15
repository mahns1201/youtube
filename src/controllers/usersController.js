export const join = (req, res) => res.render("user", { "pageTitle": "Join" });
export const login = (req, res) => res.render("user", { "pageTitle": "Login" });
export const seeUsers = (req, res) => res.render("watch", { "pageTitle": "See Users" });
export const seeUser = (req, res) => res.render("watch", { "pageTitle": "See User" });
export const editProfile = (req, res) => res.render("edit", { "pageTitle": "Edit Profile" });
