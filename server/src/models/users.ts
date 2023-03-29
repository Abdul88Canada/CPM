import mongoose from "mongoose";

import { Password } from "../services/password";

//An interface that describes the properties
//that are required to create a new user
interface UserAttrs {
    email: String;
    userName: String;
    password: String;
    user_type: String;
    created_at: Date;
}

//An interface that describes the properties
//that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties
//that a user document has
interface UserDoc extends mongoose.Document {
    email: String;
    userName: String;
    password: String;
    user_type: String;
    created_at: Date;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    user_type: {
        type: String
    },
    created_at: {
        type: Date
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
            delete ret.password;
            delete ret.__v;
        }
    }
});

UserSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed); 
        
    }
    done();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };