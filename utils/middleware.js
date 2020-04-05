exports.logRoute = (req, res, next) => {
    console.log(`${req.method}\t${req.url}`);
    next();
};

exports.makeCookiesSafe = (req, res, next) => {
    res.set('x-frame-options', 'DENY');
    res.locals.csrfToken = req.csrfToken();
    next();
};

// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// exports.asyncMiddleware = fn => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
// };

exports.logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
};

exports.clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500);
        res.json({ err: 'Uh, err... something went wrong!' });
    } else {
        next(err);
    }
    // if (req.xhr) {
    //     res.status(500).send({ error: 'Something failed!' });
    // } else {
    //     next(err);
    // }
};

exports.errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
};
