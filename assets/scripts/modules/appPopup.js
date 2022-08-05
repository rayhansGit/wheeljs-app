import AppLocalStorage from "./appLocalStorage"

class AppPopUp {
  constructor() {
    this.popup = document.getElementById("popup")
    this.feedback_form = document.getElementById("feedback-form")
    this.user_id = document.getElementById("user_id")
    this.user_id.value = ""
    this.user_local_storage_key = "spin_user_data"
    this.user_id.focus()
    this.events()

    this.app_local_storage = new AppLocalStorage()

    //this.app_local_storage.setLocalStorageData()
    //console.log(this.app_local_storage.getLocalStorageData())
    // console.log(this.app_local_storage.removeLocalStorageData())

    //this.app_local_storage.removeLocalStorageData(this.user_local_storage_key)
    //console.log(this.app_local_storage.getLocalStorageData(this.user_local_storage_key))
    this.user_id_exist = false

    this.user_info = this.app_local_storage.getLocalStorageData(this.user_local_storage_key)
    console.log(this.user_info)
    if (this.user_info != null) {
      this.destoryPopUp()
    }
  }

  events() {
    this.feedback_form.addEventListener("submit", this.handleForm.bind(this))
  }

  // functions.

  handleForm(e) {
    e.preventDefault()

    if (this.user_id.value.trim() != "") {
      var data = [
        {
          game_id: "gg_2874764",
          user_id: this.user_id.value.trim(),
          user_point: "0",
          bot_point: "0",
        },
      ]

      this.app_local_storage.setLocalStorageData(this.user_local_storage_key, data)
      // alert(this.user_id.value)
      this.destoryPopUp()
    } else {
      alert("User id is required.")

      this.user_id.value = ""
      this.user_id.focus()
    }
  }
  destoryPopUp() {
    this.popup.remove()
    document.querySelector("body").removeAttribute("class")
  }
}

export default AppPopUp
