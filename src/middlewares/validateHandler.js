
const validateHandler = (err, req, res, next) => {

  if (
    err.message.includes('required') ||
    err.message.includes('cannot exceed') ||
    err.message.includes('is already in use') ||
    err.name === 'ValidationError'
  ) { 
    return res.status(400).json({ error: err.message })
  }

  // Si el error no es de validación, lo pasamos al siguiente middleware
  next(err)
};

export { validateHandler }