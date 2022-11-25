// TODO Cross-Origin-Opener-Policy
// TODO Cross-Origin-Embedder-Policy"

module.exports = function (app) {
    // app.use(
    //     "/",
    //     function (req, res, next) {
    //         console.log(res)
    //         next()
    //     },
    //     createProxyMiddleware({
    //         target: "http://localhost:8000",
    //         changeOrigin: true,
    //     }),
    // )
    app.use(function (req, res, next) {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
        next()
    })
}
