import { ImgflipResponse, Meme } from '../types/meme'

const API_URL =  "https://api.imgflip.com/get_memes"

export const fetchMemes = async (): Promise<Meme[]> => {
    const response = await fetch(API_URL)
    const json: ImgflipResponse = await response.json()
    return json.success ? json.data.memes : []
}