import mongoose from 'mongoose'

const CommentShema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		content: { type: String, required: true },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
)

export const CommentModel = mongoose.model('Comment', CommentShema)

export const getComments = () => CommentModel.find()

export const getCommentById = (id: string) => CommentModel.findById(id)
export const getCommentByUser = (userId: string) => CommentModel.find({ user: userId })
export const getCommentByPost = (postId: string) => CommentModel.find({ post: postId })

export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((comment) => comment.toObject())

export const updateCommentById = (id: string, values: Record<string, any>) => CommentModel.findByIdAndUpdate(id, values).then((comment) => comment?.toObject())

export const deleteCommentById = (id: string) => CommentModel.findOneAndDelete({ _id: id })

export const likeComment = (commentId: string, userId: string) => CommentModel.findByIdAndUpdate(commentId, { $addToSet: { likes: userId } }, { new: true }).then((comment) => comment?.toObject())

export const unlikeComment = (commentId: string, userId: string) => CommentModel.findByIdAndUpdate(commentId, { $pull: { likes: userId } }, { new: true }).then((comment) => comment?.toObject())

export const deleteCommentByPost = (postId: string) => CommentModel.deleteMany({ post: postId })

export const deleteCommentByUser = (userId: string) => CommentModel.deleteMany({ user: userId })
