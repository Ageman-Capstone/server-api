function handlePrismaError(res, err) {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      console.log(err.meta);
      return res.status(400).json({
        field: err.meta.target,
        message: 'Duplicate field value',
      });
    case 'P2014':
      // handling invalid id errors
      return res.status(400).json({
        field: err.meta.target,
        message: 'Invalid ID',
      });
    case 'P2003':
      // handling invalid data errors
      return res.status(400).json({
        field: err.meta.field_name,
        message: 'Invalid input data',
      });
    case 'P2025':
      // handling not found record
      return res.status(400).json({
        cause: err.meta.cause,
        message: 'Record relation invalid',
      });
    default:
      // handling all other errors
      return res.status(500).json({
        message: 'Something went wrong in server',
      });
  }
}

module.exports = { handlePrismaError };