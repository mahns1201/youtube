import Video from "../models/Video";

const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.status(400).render("404", { pageTitle: "Video not found" });
    }

    return res.render("watch", { pageTitle: "watch", video });
}

const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "upload" });
}

const postUpload = async (req, res) => {
    const { path: fileUrl } = req.file; // ES6, const fileUrl = req.file.path;
    const { title, description, hashtags } = req.body;

    try {
        await Video.create({
            title,
            description,
            fileUrl,
            hashtags: Video.formatHashtags(hashtags),
        });

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("upload", { pageTitle: "upload", errorMessage: error._message });
    }
}

const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.status(400).render("404", { pageTitle: "Video not found" });
    }

    return res.render("edit", { pageTitle: "Editing", video });
}

const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;

    const video = await Video.exists({ _id: id });

    if (!video) {
        return res.status(400).render("404", { pageTitle: "Video not found" });
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);
}

const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);

    return res.redirect("/");
}

const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];

    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            }
        });
    }

    return res.render("search", { pageTitle: "Search", videos });
}

export { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo, search };