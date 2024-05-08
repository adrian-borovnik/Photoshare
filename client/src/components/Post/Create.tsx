import { CloudUploadRounded } from '@mui/icons-material'
import { Button, FormControl, FormLabel, Textarea, styled } from '@mui/joy'
import { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { PAGE_URL } from '../../utils/enums'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const PostCreate: React.FC = () => {
  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState<string | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const preview = document.getElementById('preview')
        if (preview) preview.style.backgroundImage = `url(${reader.result})`
      }
      reader.readAsDataURL(file)
      setImage(file)
    }

    console.log('file', file)
    console.log('image', image)
  }

  const handleChangeCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', caption, image)

    const formData = new FormData()
    formData.append('image', image!)
    formData.append('caption', caption!)

    const { postApi } = useApi()

    try {
      setLoading(true)
      const response = await postApi.createPost(formData)
      console.log('response', response)
      setLoading(false)
      navigate(PAGE_URL.HOME)
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full flex flex-col space-y-4"
    >
      <FormControl>
        <FormLabel>Image</FormLabel>
        <div
          id="preview"
          className="w-full h-96 bg-gray-200 bg-contain bg-no-repeat bg-center rounded-lg mb-4"
        />
        <Button startDecorator={<CloudUploadRounded />} component="label">
          Upload
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
        </Button>
      </FormControl>
      <FormControl>
        <FormLabel>Caption</FormLabel>
        <Textarea minRows={5} onChange={(e) => handleChangeCaption(e)} />
      </FormControl>
      <Button type="submit" disabled={!image || !caption} loading={loading}>
        Post
      </Button>
    </form>
  )
}
