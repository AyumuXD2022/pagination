import mongoose, { Schema } from 'mongoose'

const UserSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});
export default mongoose.model("User", UserSchema);