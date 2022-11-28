import mongoose from 'mongoose'

const { Schema, model } = mongoose

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: false,
            unique: false,
        },
        author: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
            unique: false,
        },
        task: {
            type: Schema.Types.ObjectId, 
            ref: 'Tasks',
            required: true,
            unique: false,
        },
    }
)

export default model('Comment', commentSchema)