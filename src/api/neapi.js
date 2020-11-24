import Axios from 'axios'

const request = Axios.create({
    baseURL: "http://music.sherlockouo.com",
    timeout: 100000
})

request.interceptors.response.use(
    response => {
        window.response = response

        if (response.status === 200 && response.data.code === 200) {
            return response.data
        }
        return Promise.reject(response)
    },
    e => {
        throw e
    }
)

export default request
