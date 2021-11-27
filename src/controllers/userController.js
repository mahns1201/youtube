import User from "../models/User";

const getJoin = (req, res) => {
    res.render("join")
}
const postJoin = (req, res) => {
    const { userName, name, password, password2 } = req.body;

    console.log(userName, name, password, password2)


    // res.end();
    // res.redirect("/")
}
const getLogin = (req, res) => {
    res.render("login")
}
const postLogin = (req, res) => {
    res.render("login")
}



export { getJoin, postJoin, getLogin, postLogin }