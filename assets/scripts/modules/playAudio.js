class PlayAudio {
  constructor() {
    // var audio = new Audio(".../../assets/audio/bell.mp3")
    // audio.play()

    let audio = new Audio(".../../assets/audio/bell.mp3")
    const buttons = document.querySelectorAll("button")

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        audio.play()
      })
    })
  }
}

export default PlayAudio
