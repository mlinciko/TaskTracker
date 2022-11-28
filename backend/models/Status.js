import mongoose from 'mongoose'

const { Schema, model } = mongoose

const statusSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
)

export default model('Status', statusSchema)