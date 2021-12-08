let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 3,
    },
];

const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];

    return res.render("watch", { pageTitle: "watch", video });
}

const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];

    return res.render("edit", { pageTitle: "edit", video });
}

const postEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    const { title } = req.body;

    video.title = title;

    return res.redirect(`/videos/${id}`);
}

export { watch, getEdit, postEdit };