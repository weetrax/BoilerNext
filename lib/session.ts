export const ironOptions = {
    cookieName: "boilernext_auth_cookie",
    password: "wu6Gqrr4iUb2BY3bBs5HNuBjqX64M7Xv",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}