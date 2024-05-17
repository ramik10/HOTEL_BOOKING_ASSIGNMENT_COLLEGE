import axios from "axios"

const backend = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default backend