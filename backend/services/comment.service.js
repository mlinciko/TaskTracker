import Task from '../models/Task.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

export const getCommentById = async (req, res, next) => {
    const commentId = req.query?.comment_id

    if (!commentId) {
        return res
          .status(400)
          .json({ message: 'Comment id must be provided' })
    }

    try {
        const comment = await Comment.findById(commentId)
            .populate({path: 'author', select: '_id first_name last_name'})
            .populate({path: 'task', select: '_id'})

        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' })
        }

        res
          .status(200)
          .json({
            id: comment._id,
            author: `${comment.author.first_name} ${comment.author.last_name}`,
            body: comment.body,
            task_id: comment.task._id
          })

    } catch (e) {
        console.log('*getCommentById service')
        next(e)
    }
}

export const createComment = async (req, res, next) => {
    const body = req.body?.body
    const authorId = req.body?.author_id
    const taskId = req.body?.task_id

    if (!body ) {
        return res
          .status(400)
          .json({ message: 'Body must be provided' })
    }
    if (!authorId) {
        return res
          .status(400)
          .json({ message: 'Author Id must be provided' })
    }
    if (!taskId) {
        return res
          .status(400)
          .json({ message: 'Task Id must be provided' })
    }

    try {
        let author = await User.findById(authorId)
        if (!author) {
            return res.status(404).json({ message: 'Author not found' })
        }
        let task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        const newComment = await Comment.create({
            body: body,
            author: authorId,
            task: taskId,
        })

        const createdComment = await Comment.findById(newComment.id)
            .populate({path: 'author', select: '_id first_name last_name'})
            .populate({path: 'task', select: '_id'})
    
        res
          .status(200)
          .json({
            id: createdComment._id,
            author: `${createdComment.author.first_name} ${createdComment.author.last_name}`,
            body: createdComment.body,
            task_id: createdComment.task._id
          })
    
      } catch (e) {
        console.log('*createComment service')
        next(e)
      }
}

export const updateComment = async (req, res, next) => {
    const commentId = req.body?.comment_id
    const body = req.body?.body

    if (!commentId) {
        return res
          .status(400)
          .json({ message: 'Comment id must be provided' })
    }
    if (!body) {
        return res
          .status(400)
          .json({ message: 'Body must be provided' })
    }

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' })
        }
        
        const newComment = {
            body: body,
        }
        await Comment.updateOne({_id: commentId}, newComment)

        const updatedComment = await Comment.findById(commentId)
            .populate({path: 'author', select: '_id first_name last_name'})
            .populate({path: 'task', select: '_id'})

        res
          .status(200)
          .json({
            id: updatedComment._id,
            author: `${updatedComment.author.first_name} ${updatedComment.author.last_name}`,
            body: updatedComment.body,
            task_id: updatedComment.task._id
          })

    } catch (e) {
        console.log('*updateComment service')
        next(e)
    }
}

export const deleteComment = async (req, res, next) => {
    const commentId = req.query?.comment_id

    if (!commentId) {
        return res
          .status(400)
          .json({ message: 'Comment id must be provided' })
    }

    try {
        let comment = await Comment.findById(commentId)
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' })
        }
        await comment.remove()

        res
          .status(200)
          .json({ message: `Comment has been removed` })

    } catch (e) {
        console.log('*deleteComment service')
        next(e)
    }
}

export const getCommentsByTask = async (req, res, next) => {
    const taskId = req.query?.task_id

    if (!taskId) {
        return res
          .status(400)
          .json({ message: 'Task id must be provided' })
    }

    try {
        let task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        let allComments = await Comment.find({task: taskId})
            .populate({path: 'author', select: 'first_name last_name'})
            .populate({path: 'task', select: '_id'})

        if (!allComments) {
          return res.status(404).json({ message: 'Comments not found' })
        }
        let mappedComments = []
        allComments.forEach((comment) => {
            mappedComments.push({
                id: comment._id,
                author: `${comment.author.first_name} ${comment.author.last_name}`,
                body: comment.body,
                task_id: comment.task._id
            })
        })
    
        res
          .status(200)
          .json(mappedComments)
    
      } catch (e) {
        console.log('*getCommentsByTask service')
        next(e)
    }
}