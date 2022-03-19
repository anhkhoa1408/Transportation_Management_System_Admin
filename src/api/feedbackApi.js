import axiosClient from "./axiosClient";

class FeedbackApi {
  getList = (params) => {
    const url = process.env.MAIN_URL.concat("/feedbacks")
    return axiosClient.get(url, { params })
  }
}

const feedbackApi = new FeedbackApi()
export default feedbackApi;