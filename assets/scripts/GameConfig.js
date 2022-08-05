class GameConfig {
  // Initialize.

  constructor() {
    this.wheelPower = 0

    this.wheelSpinning = false

    // players playing status.
    this.player_one = true
    this.botPlay = false

    // players name.
    this.title_player_one = "You"
    this.title_player_two = "Player 2"

    // points.
    this.playerPoint = 0
    this.botPoint = 0

    // players discount.
    this.discount_player_one = 0
    this.discount_player_two = 0

    // Spining Timing.

    this.spin_duration = 25
    this.wheel_spins_count = 1000

    // Settimeout Interval

    this.spinTimoutInterval = 3000

    // default wheel spins.

    // wheel configuration.
    this.theWheel = new Winwheel({
      numSegments: 5, // Specify number of segments.
      outerRadius: 212, // Set outer radius so wheel fits inside the background.
      textFontSize: 28, // Set font size as desired.
      responsive: true, // This wheel is responsive!
      // Define segments including colour and text.
      segments: [
        //these comes from a file/ db
        { fillStyle: "#7de6ef", text: "30%" },
        { fillStyle: "#e7706f", text: "40%" },
        { fillStyle: "#89f26e", text: "50%" },
        { fillStyle: "#29a1dd", text: "60%" },
        { fillStyle: "#eae56f", text: "70%" },
      ],
      // Specify the animation to use.
      animation: {
        // type: "spinToStop",
        direction: "clockwise",
        type: "spinOngoing",
        duration: this.spin_duration, // Duration in seconds.
        spins: this.wheel_spins_count, // Number of complete spins.
        callbackFinished: this.alertPrize.bind(this),
      },
    })

    // Buttons.

    this.btn_start_spin = document.getElementById("startSpin")
    this.btn_stop_spin = document.getElementById("stopSpin")

    // Result container.

    this.result_container = document.getElementById("result_container")
    this.result_player_one = document.getElementById("result_player_one")
    this.result_player_two = document.getElementById("result_player_two")
    this.final_result = document.getElementById("final_result")

    // call all the events.
    this.events()
  }

  //Events.

  events() {
    this.btn_start_spin.addEventListener("click", this.startSpin.bind(this))
    this.btn_stop_spin.addEventListener("click", this.stopSpin.bind(this))
  }

  // Functions/Actions.

  /**
   * Starts the wheel on button click
   */
  startSpin() {
    if (!this.wheelSpinning) {
      this.wheelSpinning = true

      this.theWheel.startAnimation()

      if (!this.botPlay) {
        this.result_container.style.display = "block"
        this.result_player_one.innerHTML = this.title_player_one + " are playing!"
        this.result_player_one.classList.add("current-player")
        this.btn_start_spin.style.display = "none"
        this.btn_stop_spin.style.display = "initial"
        this.btn_stop_spin.className = "btnGlow"
      }
    }
  }
  /**
   * function to stop the wheel by player
   */
  stopSpin() {
    // segment no.

    this.theWheel.animation.spins = this.wheel_spins_count - 500
    this.theWheel.startAnimation()

    setTimeout(() => {
      this.theWheel.stopAnimation()
      this.wheelSpinning = false
    }, this.spinTimoutInterval)

    // this.theWheel.animation.spins = 25
    // this.theWheel.startAnimation()

    if (!this.botPlay) {
      this.btn_stop_spin.className = "btnFlat"
      // document.getElementById("stopSpin").innerHTML = "Calculating result"
      this.btn_stop_spin.style.display = "none"
      // document.getElementById("stopSpin").innerHTML = this.title_player_two + "'s turn."
      // document.getElementById("stopSpin").disabled = "true"

      this.result_player_one.innerHTML = "Calculating score ..."

      setTimeout(() => {
        this.result_player_one.classList.remove("current-player")
        this.result_player_two.classList.add("current-player")
        this.botPlay = true
        this.playBot()
      }, this.spinTimoutInterval + 3000) // added 3000 mili seconds more.
    } else {
      // console.log("Stop For Bot")
    }
  }

  /**
   * Triggers the bot to play after the player stops the wheel
   */
  playBot() {
    if (this.botPlay) {
      this.btn_stop_spin.style.display = "none"
      this.result_player_two.innerHTML = this.title_player_two + " is playing!"
      document.getElementById("stopSpin").innerHTML = "Playing " + this.title_player_two
      this.startSpin()

      setTimeout(() => {
        this.stopSpin()
      }, this.spinTimoutInterval)
    } else {
      this.botPlay = false
    }
  }

  /**
   * Resets the wheel to a random position
   * If you want to set the wheel to same position each time, add the angle value in range of 0-360
   */
  resetWheel() {
    this.theWheel.stopAnimation(false)
    this.theWheel.rotationAngle = Math.floor(Math.random() * 360)
    this.theWheel.draw()
    this.wheelSpinning = false
  }

  /**
   * Sets the result in the result div
   */
  alertPrize(indicatedSegment) {
    if (this.botPlay) {
      //div.append(this.title_player_two + " got " + indicatedSegment.text)
      this.botPoint = parseInt(indicatedSegment.text)
      this.result_player_two.innerHTML = this.title_player_two + " got <b>" + this.botPoint + "%</b>"
    } else {
      // div.append(this.title_player_one + " got " + indicatedSegment.text)
      this.playerPoint = parseInt(indicatedSegment.text)
      this.result_player_one.innerHTML = this.title_player_one + " got <b>" + this.playerPoint + "%</b>"
    }
    //document.getElementById("result").appendChild(div)
    this.processResult(this.botPoint, this.playerPoint)
  }

  /**
   * Processing the both players result and take action
   */
  processResult(botPoint, playerPoint) {
    if (botPoint != 0 && playerPoint != 0) {
      this.btn_start_spin.style.display = "none"
      this.discount_player_one = playerPoint
      this.discount_player_two = botPoint

      this.final_result.style.display = "block"
      this.btn_stop_spin.style.display = "none"

      if (botPoint == playerPoint) {
        this.result_container.innerHTML = `<div class="result_tie">It's a Tie, Let's play again!</div>`
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else if (botPoint > playerPoint) {
        // document.getElementById("result").append(this.title_player_one + " Lose!")
        this.final_result.innerHTML = this.title_player_one + " Lose!" + "<br><b>Final Discount:" + this.calculateDiscount() + "</b>"
      } else {
        // document.getElementById("result").append(this.title_player_one + " Win!")
        // this.calculateDiscount()
        // this.final_result.innerHTML = "Final Discount:" + this.calculateDiscount()
        this.final_result.innerHTML = this.title_player_one + " Win!" + "<br><b>Final Discount:" + this.calculateDiscount() + "</b>"
      }

      this.result_player_one.classList.remove("current-player")
      this.result_player_two.classList.remove("current-player")
    } else {
      // document.getElementById("result").append(this.title_player_two + "'s turn")
    }
  }

  calculateDiscount() {
    var discount_amount = this.discount_player_one + (this.discount_player_one - this.discount_player_two) / 2

    return discount_amount + "%"
  }

  // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  resetWheel() {
    this.theWheel.stopAnimation(false) // Stop the animation, false as param so does not call callback function.
    this.theWheel.rotationAngle = 0 // Re-set the wheel angle to 0 degrees.
    this.theWheel.draw() // Call draw to render changes to the wheel.

    this.wheelSpinning = false // Reset to false to power buttons and spin can be clicked again.
  }
}

export default GameConfig
