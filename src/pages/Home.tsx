import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Card, { CardFooter, CardPadding } from '../components/Card'
import Chip from '../components/Chip'
import deviceStore from '../stores/deviceStore'
import registerStore from '../stores/registerStore'
import walletStore from '../stores/walletStore'

function LinkButton() {
  const keys = deviceStore((s) => s.keys)
  const device = deviceStore((s) => s.device)
  const linkHalo = deviceStore((s) => s.linkHalo)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)

  if (!keys) {
    return (
      <Button onClick={linkHalo}>
        Scan Chip
      </Button>
    )
  } else if (device && registered) {
    return <Navigate to="/success" />

    return (
      <Button to={'/success'} fullWidth>
        View Halo
      </Button>
    )
  } else if (device && !connected && !registered) {
    return (
      <Button fullWidth disabled>
        Create Certificate for Product
      </Button>
    )
  } else if (device && keys && !registered) {
    return (
      <Button to={'/register'} fullWidth>
        Certificate for Product
      </Button>
    )
  } else {
    return (
      <Button fullWidth disabled>
        Certificate for Product
      </Button>
    )
  }
}

export default function Home() {
  const init = deviceStore((s) => s.init)
  const keys = deviceStore((s) => s.keys)
  const loading = deviceStore((s) => s.loading)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)
  // const test = registerStore((s) => s.test)

  useEffect(() => {
    init()
  }, [])

  return (
    <Card loading={loading}>
      <CardPadding>
        <Chip detected={keys ? true : false} />

        {/* {connected && <button onClick={test}>Test</button>} */}

        {keys ? (
          <>
            <h1 className="text-3xl mt-6 uppercase">
              Product
              <br />
              Detected
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">
              This Product hasn’t been registered. Tap link below to mint Certificate for Product.
            </p>
            <h3 className="font-normal mt-4 mb-1 text-light-gray text-xs">Device ID</h3>
            <p className="break-word font-bold text-smb">{keys?.primaryPublicKeyHash}</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl mt-6 uppercase">
              No Product
              <br />
              Detected
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">
              Scan Product by tapping the button below and holding the chip to your smartphone's NFC scanner.
            </p>
          </>
        )}
      </CardPadding>
      <CardFooter>
        <CardPadding>
          {LinkButton()}
          {!connected && !registered && (
            <p className="text-center text-xs text-light-gray uppercase mt-4">Connect wallet to mint Certificate for Product</p>
          )}
        </CardPadding>
      </CardFooter>
    </Card>
  )
}
