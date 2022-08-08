import axios from "axios"

class ApiResponse {
  constructor() {
    // http://localhost/wheeljs_api/wp-json/ggspin/v1/read/
    // http://localhost/wheeljs_api/wp-json/ggspin/v1/create/?id=01
    this.root_url = "http://localhost/wheeljs_api/"
    this.api_url = this.root_url + "wp-json/ggspin/v1/read/"
    this.api_create_url = this.root_url + "wp-json/ggspin/v1/create/"
    this.events()
    //this.create_data()
    //this.read_data()
  }

  events() {
    // console.log("API Response")
  }

  async read_data() {
    try {
      const response = await axios.get(this.api_url)
      console.log(response.data)
    } catch {}
  }

  async create_data(game_id, user_id, user_res, bot_res) {
    // data need to post.

    const newPost = {
      game_id: game_id,
      user_id: user_id,
      user_res: user_res,
      bot_res: bot_res,
      played_at: new Date().toLocaleString().replace(",", ""),
    }

    console.log(newPost)
    console.table(newPost)

    try {
      const response = await axios.post(this.api_create_url, newPost)
      console.log(response.data)
    } catch (err) {
      // Handle Error Here
      console.error(err)
    }
  }
}

export default ApiResponse
