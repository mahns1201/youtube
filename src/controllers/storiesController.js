export const home = (req, res) => res.render("home", { "pageTitle": "Home" });
export const trending = (req, res) => res.render("trending", { "pageTitle": "Watch" });
export const newStories = (req, res) => res.render("stories", { "pageTitle": "Stories" });
export const seeStory = (req, res) => res.render("story", { "pageTitle": "Story" });
export const editStory = (req, res) => res.render("editStory", { "pageTitle": "Edit Story" });
export const deleteStory = (req, res) => res.render("deleteStory", { "pageTitle": "Delete Story" });
