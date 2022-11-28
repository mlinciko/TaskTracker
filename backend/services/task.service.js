import Task from '../models/Task.js'
import User from '../models/User.js'
import Status from '../models/Status.js'
import Dashboard from '../models/Dashboard.js'
import moment from 'moment'

export const getTaskById = async (req, res, next) => {
    const taskId = req.query?.task_id

    if (!taskId) {
        return res
          .status(400)
          .json({ message: 'Task id must be provided' })
    }

    try {
        const task = await Task.findById(taskId)
            .populate({path: 'creator', select: '_id first_name last_name'})
            .populate({path: 'executor', select: '_id first_name last_name'})
            .populate({path: 'status', select: 'name'})

        if (!task) {
          return res.status(404).json({ message: 'Tasks not found' })
        }

        res
          .status(200)
          .json(task)

    } catch (e) {
        console.log('*getTaskById service')
        next(e)
    }
}

export const getTasks = async (req, res, next) => {
    const statusName = req.query?.status
    const dashboardId = req.query?.dashboard_id
    const executorId= req.query?.executor_id

    if (!dashboardId) {
        return res
          .status(400)
          .json({ message: 'Dashboard id must be provided' })
    }

    try {
        let searchParams = {}
        searchParams.dashboard = dashboardId
        if (executorId) {
            searchParams.executor = executorId
        }
        
        let allTasks = await Task.find(searchParams)
            .populate({path: 'creator', select: '_id first_name last_name'})
            .populate({path: 'executor', select: '_id first_name last_name'})
            .populate({path: 'status', select: 'name'})

        if (!allTasks) {
          return res.status(404).json({ message: 'Tasks not found' })
        }

        if (statusName) {
            allTasks = allTasks.filter(task => task.status.name === statusName)
        }
    
        res
          .status(200)
          .json(allTasks)
    
      } catch (e) {
        console.log('*getTasks service')
        next(e)
    }
}

export const createTask = async (req, res, next) => {
    const name = req.body?.name
    const theme = req.body?.theme
    const description = req.body?.description
    const statusId = req.body?.status_id ? req.body?.status_id : "636f69c8004fc336176be4e0"
    const creatorId = req.body?.creator_id
    const executorId = req.body?.executor_id
    const dashboardId = req.body?.dashboard_id
    const deadline = req.body?.deadline

    if (!name) {
        return res
          .status(400)
          .json({ message: 'Task name must be provided' })
    }
    if (!theme) {
        return res
          .status(400)
          .json({ message: 'Task theme must be provided' })
    }
    if (!description) {
        return res
          .status(400)
          .json({ message: 'Task description must be provided' })
    }
    if (!creatorId) {
        return res
          .status(400)
          .json({ message: 'Creator Id must be provided' })
    }
    if (!executorId) {
        return res
          .status(400)
          .json({ message: 'Executor Id must be provided' })
    }
    if (!dashboardId) {
        return res
          .status(400)
          .json({ message: 'Dashboard Id must be provided' })
    }
    if (!deadline) {
        return res
          .status(400)
          .json({ message: 'Deadline must be provided' })
    }

    try {
        let creator = await User.findById(creatorId)
        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' })
        }
        let executor = await User.findById(executorId)
        if (!executor) {
            return res.status(404).json({ message: 'Executor not found' })
        }
        let status = await Status.findById(statusId)
        if (!status) {
            return res.status(404).json({ message: 'Executor not found' })
        }
        let dashboard = await Dashboard.findById(dashboardId)
        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found' })
        }
        if (moment(deadline, "YYYY.MM.DD").isBefore(moment(moment(), "YYYY.MM.DD"))) {
            return res.status(404).json({ message: "Deadline can't be before now" })
        }

        const newTask = await Task.create({
            name: name,
            theme: theme,
            description: description,
            status: statusId,
            creator: creatorId,
            executor: executorId,
            dashboard: dashboardId,
            deadline: moment(deadline, "DD.MM.YYYY").format("DD.MM.YYYY"),
        })

        const createdTasks = await Task.findById(newTask.id)
            .populate({path: 'creator', select: '_id first_name last_name'})
            .populate({path: 'executor', select: '_id first_name last_name'})
            .populate({path: 'status', select: 'name'})
    
        res
          .status(200)
          .json(createdTasks)
    
      } catch (e) {
        console.log('*createTask service')
        next(e)
      }
}

export const updateTask = async (req, res, next) => {
    const taskId = req.query?.task_id
    const name = req.body?.name
    const theme = req.body?.theme
    const description = req.body?.description
    const statusId = req.body?.status_id
    const creatorId = req.body?.creator_id
    const executorId = req.body?.executor_id
    const dashboardId = req.body?.dashboard_id

    if (!taskId) {
        return res
          .status(400)
          .json({ message: 'Task id must be provided' })
    }

    try {
        const task = await Task.findById(taskId)
        if (!task) {
          return res.status(404).json({ message: 'Tasks not found' })
        }
        if (creatorId) {
           let creator = await User.findById(creatorId)
            if (!creator) {
                return res.status(404).json({ message: 'Creator not found' })
            } 
        }
        if (executorId) {
            let executor = await User.findById(executorId)
            if (!executor) {
                return res.status(404).json({ message: 'Executor not found' })
            }
        }
        if (statusId) {
           let status = await Status.findById(statusId)
            if (!status) {
                return res.status(404).json({ message: 'Executor not found' })
            } 
        }
        if (dashboardId) {
            let dashboard = await Dashboard.findById(dashboardId)
            if (!dashboard) {
                return res.status(404).json({ message: 'Dashboard not found' })
            }
        }
        
        const newTask = {
            name: name ? name : task.name,
            theme: theme ? theme : task.theme,
            description: description ? description : task.description,
            status: statusId ? statusId : task.status,
            creator: creatorId ? creatorId : task.creator,
            executor: executorId ? executorId : task.executor,
            dashboard: dashboardId ? dashboardId : task.dashboard,
        }

        await Task.updateOne({_id: taskId}, newTask)

        const updatedTask = await Task.findById(taskId)
            .populate({path: 'creator', select: '_id first_name last_name'})
            .populate({path: 'executor', select: '_id first_name last_name'})
            .populate({path: 'status', select: 'name'})

        res
          .status(200)
          .json(updatedTask)

    } catch (e) {
        console.log('*getTaskById service')
        next(e)
    }
}