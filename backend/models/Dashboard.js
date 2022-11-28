import mongoose from 'mongoose'

const { Schema, model } = mongoose

const dashboardSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
            unique: false,
        },
    }
)

export default model('Dashboard', dashboardSchema)