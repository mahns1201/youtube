export const home = (req, res) => res.render("home", { "pageTitle": "Home" });
export const trending = (req, res) => res.render("watch", { "pageTitle": "Watch" });
export const newStories = (req, res) => res.render("watch", { "pageTitle": "New Story" });
export const seeStory = (req, res) => res.render("watch", { "pageTitle": "See Story" });
export const editStory = (req, res) => res.render("edit", { "pageTitle": "Edit Story" });
export const deleteStory = (req, res) => res.render("delete", { "pageTitle": "Delete Story" });
