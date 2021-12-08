const video = (req, res) => {
    const { id } = req.params;

    return res.send(`<h1>video #${id}</h1>`)
}

export { video }