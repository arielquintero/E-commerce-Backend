const errorHandler = (err, req, res, next) => {

  const errorMessage = err.message || 'Internal Server Error'

  let statusCode = 500

  if (errorMessage.includes('not found')) {
    statusCode = 404
  } else if (
    errorMessage.includes('invalid') ||
    errorMessage.includes('not valid') ||
    errorMessage.includes('zero') || 
    errorMessage.includes('Not enough stock')
  ) {
    statusCode = 400
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage
  })
}


export { errorHandler }
