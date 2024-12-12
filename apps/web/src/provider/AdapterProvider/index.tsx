import { WalletProvider } from '@coin98t/wallet-adapter-react'
import { WalletModalProvider } from '@coin98t/wallet-adapter-react-ui'
import { FC, ReactNode } from 'react'
import { chainsSupported, defaultChains, DynamicWalletModalC98, walletsSupported } from './constants'

interface AdapterProviderProps {
  children: ReactNode
}

const AdapterProvider: FC<AdapterProviderProps> = ({ children }) => {
  return (
    <WalletProvider wallets={walletsSupported} enables={chainsSupported} autoConnect keepConnectionOnDisconnected>
      <WalletModalProvider>
        <DynamicWalletModalC98 isC98Theme enableChains={defaultChains} isHiddenSocial />
        {children}
      </WalletModalProvider>
    </WalletProvider>
  )
}

export default AdapterProvider
