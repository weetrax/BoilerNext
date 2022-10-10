import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
    function userRoute(req, res) {
        if (req.method === "GET") {
            res.send({ user: req.session.user });
        }
    },
    ironOptions
);