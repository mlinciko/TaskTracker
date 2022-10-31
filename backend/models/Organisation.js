import mongoose from 'mongoose'

const { Schema, model } = mongoose

const organisationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        inn: {
            type: String,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    }
)

export default model('Organisation', organisationSchema)