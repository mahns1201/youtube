import User from "../models/User";
import bcrypt from "bcrypt";

const getJoin = (req, res) => {
    res.render("join")
}
const postJoin = async (req, res) => {
    let errorMessage;
    const { username, name, password, password2 } = req.body;
    const exists = await User.exists({ username });

    if (exists) {
        errorMessage = "The username is already used"
        return res.status(400).render("join", { errorMessage });
    }

    if (password !== password2) {
        errorMessage = "Please check the password"
        return res.status(400).render("join", { errorMessage });
    }

    await User.create({
        name,
        username,
        password
    })

    return res.redirect("/user/login");
}
const getLogin = (req, res) => {
    res.render("login")
}

const postLogin = async (req, res) => {
    let errorMessage;
    const { username, password } = req.body;

    const user = await User.findOne({ username })

    if (!user) {
        errorMessage = "The username is not exist"
        res.status(400).render("login", { errorMessage })
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
        errorMessage = "The Password is not valid"
        res.status(400).render("login", { errorMessage })
    }

    req.session.loggedIn = true;
    req.session.user = user;
    console.log(req.session)
    res.redirect("/")
}



export { getJoin, postJoin, getLogin, postLogin }