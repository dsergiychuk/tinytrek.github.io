const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let opponent // Define a variable to hold the opponent
let glacifire
let renderedSprites
let battleAnimationId
let queue

function getRandomOpponent() {
  // Define an array of potential opponents
  const potentialOpponents = ['Flamehop', 'Golddigger'] // Add more if needed

  // Randomly select an opponent from the array
  const randomIndex = Math.floor(Math.random() * potentialOpponents.length)
  const randomOpponent = potentialOpponents[randomIndex]

  // Create the selected opponent as a Monster instance
  return new Monster(monsters[randomOpponent])
}

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  glacifire = new Monster(monsters.Glacifire)
  renderedSprites = [glacifire]
  queue = []

  opponent = getRandomOpponent() // Get a random opponent
  renderedSprites.push(opponent) // Add opponent to renderedSprites

  // Update the enemy name in the health bar
  document.querySelector('#enemyName').innerHTML = opponent.name

  glacifire.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // our event listeners for our buttons (attack)
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      glacifire.attack({
        attack: selectedAttack,
        recipient: opponent,
        renderedSprites
      })

      if (opponent.health <= 0) {
        queue.push(() => {
          opponent.faint()
        })
        queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'

              gsap.to('#overlappingDiv', {
                opacity: 0
              })

              battle.initiated = false
              audio.Map.play()
            }
          })
        })
      }

      // opponent or enemy attacks right here
      const randomAttack =
        opponent.attacks[Math.floor(Math.random() * opponent.attacks.length)]

      queue.push(() => {
        opponent.attack({
          attack: randomAttack,
          recipient: glacifire,
          renderedSprites
        })

        if (glacifire.health <= 0) {
          queue.push(() => {
            glacifire.faint()
          })

          queue.push(() => {
            // fade back to black
            gsap.to('#overlappingDiv', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#userInterface').style.display = 'none'

                gsap.to('#overlappingDiv', {
                  opacity: 0
                })

                battle.initiated = false
                audio.Map.play()
              }
            })
          })
        }
      })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackType').innerHTML = selectedAttack.type
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
  })
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  console.log(battleAnimationId)

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
// initBattle() // working on the battle scenes
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})
