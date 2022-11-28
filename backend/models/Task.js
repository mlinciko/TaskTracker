import mongoose from 'mongoose'

const { Schema, model } = mongoose

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        theme: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: true,
            unique: false,
        },
        status: {
            type: Schema.Types.ObjectId, 
            ref: 'Status',
            required: true,
            unique: false,
        },
        dashboard: {
            type: Schema.Types.ObjectId, 
            ref: 'Dashboard',
            required: true,
            unique: false,
        },
        creator: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
            unique: false,
        },
        executor: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
            unique: false,
        },
        deadline: {
            type: String,
            required: true,
            unique: false,
        }
    },
    {
        timestamps: true
    }
)

export default model('Tasks', taskSchema)