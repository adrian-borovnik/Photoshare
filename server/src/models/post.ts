import mongoose from 'mongoose'

const PostShema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		imagePath: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{ timestamps: true },
)

export const PostModel = mongoose.model('Post', PostShema)

export const getPosts = () => PostModel.find()

export const getPostById = (id: string) => PostModel.findById(id)
export const getPostByUser = (userId: string) => PostModel.find({ user: userId })

export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject())

export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values).then((post) => post?.toObject())

export const deletePostById = (id: string) => PostModel.findOneAndDelete({ _id: id })

export const deletePostByUser = (userId: string) => PostModel.deleteMany({ user: userId })

// TODO | Myb not needed

export const likePost = (postId: string, userId: string) => PostModel.findByIdAndUpdate(postId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, { new: true }).then((post) => post?.toObject())

export const dislikePost = (postId: string, userId: string) => PostModel.findByIdAndUpdate(postId, { $addToSet: { dislikes: userId }, $pull: { likes: userId } }, { new: true }).then((post) => post?.toObject())

export const unlikePost = (postId: string, userId: string) => PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true }).then((post) => post?.toObject())

export const undislikePost = (postId: string, userId: string) => PostModel.findByIdAndUpdate(postId, { $pull: { dislikes: userId } }, { new: true }).then((post) => post?.toObject())

export const getPostLikes = (postId: string) => PostModel.findById(postId).then((post) => post?.likes)
