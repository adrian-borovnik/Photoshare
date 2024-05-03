import mongoose from 'mongoose'

const UserShema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		avatar: { type: String, required: true },
		email: { type: String, required: true },
		auth: {
			password: { type: String, required: true, select: false },
			salt: { type: String, required: true, select: false },
			sessionToken: { type: String, select: false },
		},
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{ timestamps: true },
)

export const UserModel = mongoose.model('User', UserShema)

export const getUsers = () => UserModel.find()

export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserByUsername = (username: string) => UserModel.findOne({ username })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'auth.sessionToken': sessionToken })

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values).then((user) => user?.toObject())

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
