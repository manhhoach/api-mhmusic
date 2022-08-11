import axios from "axios"

export default async function getUrl(idSong: string) {
  try {
    const options = {
      method: 'GET',
      url: `http://api.mp3.zing.vn/api/streaming/audio/${idSong}/320`
    };
    let response = await axios.request(options)
    if (response.request.res.responseUrl&&response.data)
      return { success: true, url: response.request.res.responseUrl }
    else
      return {
        success: false
      }
  }
  catch (err: any) {
    console.log(err)
    return {
      success: false
    }
  }

}
