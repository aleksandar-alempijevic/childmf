import { useEffect, useState } from 'react'

function App() {
  const parentOrigin = import.meta.env.VITE_HOST_URL
  const [message, setMessage] = useState<string>() // string | undefined

  function onRecievedMessage(event: MessageEvent) {
    console.log(event)
    if (event.origin !== parentOrigin) {
      return
    }

    setMessage(event.data.message)
  }

  useEffect(function () {
    window.addEventListener('message', onRecievedMessage)

    return function () {
      window.removeEventListener('message', onRecievedMessage)
    }
  })

  if (message === undefined) {
    return <p className="ml-3">no message has been received</p>
  }

  return <p className="ml-3">Message received: {message}</p>
}

export default App
