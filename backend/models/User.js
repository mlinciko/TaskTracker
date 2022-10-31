import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      unique: false,
    },
    last_name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    tel: {
      type: String,
      required: true,
      unique: true
    },
    position: {
      type: String,
      required: false,
      unique: false
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    access_level: {
      type: String,
      enum: ['maximum', 'medium', 'default'],
      default: 'default',
      required: true
    },
    organisation_id: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: false
  }
)

export default model('User', userSchema)
