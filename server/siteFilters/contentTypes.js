let getHeaderFunc = type => (req, res, next) => {
  res.header('Content-Type', type)
  next()
}

export const html = getHeaderFunc('text/html')
export const json = getHeaderFunc('application/json;text/json')
