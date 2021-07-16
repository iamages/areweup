const toCheck = {
  "api-v1": {
    name: "API v1",
    url: "https://iamages.uber.space/iamages/api"
  },
  "api-v2": {
    name: "API v2",
    url: "https://iamages.uber.space/iamages/api/v2"
  },
  "web": {
    name: "Web",
    url: "https://iamages.github.io/web"
  },
  "web-drop": {
    name: "Web Drop",
    url: "https://iamages.github.io/web-drop"
  },
  "apple": {
    name: "iOS/Catalyst",
    url: "https://apps.apple.com/my/app/iamages/id1550945817"
  },
  "discord-bot": {
    name: "Discord Bot",
    url: ""
  }
}

function handleCheckFailure(check, element) {
  switch (check) {
    case "web":
    case "web-drop":
      element.innerHTML = `${toCheck[check].name}: <a href="${toCheck[check].url}" target="_blank">❓ Unknown</a>`
      break
    default:
      element.innerHTML = `${toCheck[check].name}: ❌ Down`
      break
  }
}

for (const check in toCheck) {
  console.log(`Checking: ${check}`)
  const element = document.getElementById(check)
  fetch(toCheck[check].url, {
    method: "HEAD"
  }).then((response) => {
    if (response.ok) {
      element.innerHTML = `${toCheck[check].name}: <a href="${toCheck[check].url}" target="_blank">✅ Up</a>`
    } else {
      handleCheckFailure(check, element)
    }
  }).catch((err) => {
    console.error(`Error for: ${check}`, err)
    handleCheckFailure(check, element)
  })
}

setTimeout(() => {
  window.location.reload()
}, 600000)