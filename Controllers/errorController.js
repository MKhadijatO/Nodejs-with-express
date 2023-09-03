module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message:error.message,
            stackTrace: error.stack,
            errors: error
        });
    } else if(process.env.NODE_ENV === 'production'){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message:error.message
        });
    }

    

}