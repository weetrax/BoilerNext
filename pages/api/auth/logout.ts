import { ironOptions } from '../../../lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
    function logoutRoute(req, res) {
        req.session.destroy();
        res.send({ user: null });
    },
    ironOptions
);