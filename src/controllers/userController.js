import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

const user = (req, res) => { return res.send("<h1>user</h1>") }

const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

const postJoin = async (req, res) => {
    const pageTitle = "Join"
    const { name, username, email, password, password2, location } = req.body;

    if (password !== password2) {
        return res.status(400).render("join", { pageTitle, errorMessage: "Password confirmation dose not match." });
    }

    const exists = await User.exists({ $or: [{ username }, { email }] });

    if (exists) {
        return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken." });
    }

    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });

const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const { username, password } = req.body;

    const user = await User.findOne({ username, socialOnly: false });

    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exists.",
        });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password" });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`

    return res.redirect(finalUrl);
};

const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRETE,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`

    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();


    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com"

        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();

        console.log(userData);

        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();

        const emailObject = emailData.find(email => email.primary === true && email.verified === true);


        if (!emailObject) {
            return redirect("/login");
        }

        let user = await User.findOne({ email: emailObject.email });

        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatarUrl,
                name: userData.name,
                username: userData.login,
                email: emailObject.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;

        return res.redirect("/");
    } else {
        return redirect("/login");
    }
};

const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
}

const postEdit = (req, res) => {
    return res.render("edit-profile");
}

const logout = (req, res) => {
    req.session.destroy();

    return res.redirect("/");
}

export { user, getJoin, postJoin, getLogin, postLogin, startGithubLogin, finishGithubLogin, getEdit, postEdit, logout }