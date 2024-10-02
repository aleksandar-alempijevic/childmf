import { useEffect, useState } from 'react'

function App() {
  const parentOrigin = import.meta.env.VITE_HOST_URL
  const [filter, setFilter] = useState<string>('') // string | undefined

  function onRecievedMessage(event: MessageEvent) {
    if (event.origin !== parentOrigin) {
      return
    }

    setFilter(event.data.message)
  }

  useEffect(function () {
    window.addEventListener('message', onRecievedMessage)

    return function () {
      window.removeEventListener('message', onRecievedMessage)
    }
  })

  const items = [
    { name: 'Boeing 737', price: '10$' },
    { name: 'Airbus A350', price: '20$' },
    { name: 'Saric 1', price: '99$' }
  ]

  return (
    <div className="w-52 p-3">
      <div>Products:</div>
      {items
        .filter((item) => (filter ? item.name.includes(filter) : item.name))
        .map((item, index) => (
          <div
            key={index}
            className="m-1 rounded-md border-2 border-solid border-blue-400 p-1 text-center"
          >
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        ))}
    </div>
  )
}

export default App
