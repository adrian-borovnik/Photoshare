import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { Button, FormControl, FormLabel, Textarea } from '@mui/joy'

interface Props {
  fetchMethod: () => Promise<any>
}

export const CommentCreate: React.FC<Props> = ({ fetchMethod }) => {
  const { id } = useParams()

  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { commentApi } = useApi()

    try {
      setLoading(true)
      await commentApi.createComment({
        content,
        postId: id!,
      })
      setLoading(false)
      await fetchMethod()
    } catch (error) {
      console.error(error)
    } finally {
      setContent('')
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end space-y-2"
      >
        <FormControl className="w-full">
          <FormLabel>Comment</FormLabel>
          <Textarea
            minRows={5}
            onChange={(e) => handleChangeContent(e)}
            value={content}
          />
        </FormControl>
        <Button
          type="submit"
          disabled={!content}
          loading={loading}
          className="w-fit"
        >
          Post
        </Button>
      </form>
    </div>
  )
}
