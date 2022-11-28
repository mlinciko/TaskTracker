import Status from '../models/Status.js'

export const getAllStatuses = async (req, res, next) => {
    try {
      const statuses = await Status.find()
  
      if (!statuses) {
        return res.status(404).json({ message: 'Statuses not found' })
      }

      let mappedStatuses = []
      statuses.forEach((status) => {
        mappedStatuses.push({
          id: status._id,
          name: status.name
        })
      })
  
      res
        .status(200)
        .json(mappedStatuses)
  
    } catch (e) {
      console.log('*getAllStatuses service')
      next(e)
    }
  }