const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.user = req.session.user

    console.log(res.locals.user)
    next();
};

export { localMiddleware };