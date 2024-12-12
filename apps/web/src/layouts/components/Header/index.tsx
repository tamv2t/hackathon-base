'use client'
import { useWallet } from '@coin98t/wallet-adapter-react'
import { useWalletModal } from '@coin98t/wallet-adapter-react-ui'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon } from '@repo/ui'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Header = () => {
  const { theme, setTheme } = useTheme()
  const { openWalletModal } = useWalletModal()
  const { disconnect, connected, address } = useWallet()

  const onChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const renderWallet = () => {
    return connected ? (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="sm" variant="outline" className="bg-transparent border-b border-primaryButtonHover rounded-2xl">
            <div className="flex mr-2 gap-x-1">
              <div>0</div>
              <p>SYMBOL</p>
            </div>
            <div>{address}</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-backgroundChild outline:none">
          <DropdownMenuItem className="cursor-pointer bg-primaryButtonHover text-textTitleActive" onClick={disconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <button onClick={openWalletModal}>
        <Icon name="app_c98_finance" className="text-2xl" />
      </button>
    )
  }
  return (
    <header className="h-[64px] flex justify-between items-center ">
      <Link href={'/'}>
        <Image alt="C98 Logo" width={128} height={128} src="icons/c98-long-logo.svg" />
      </Link>
      <div className="flex items-center ml-auto gap-x-4">
        {renderWallet()}
        <button onClick={onChangeTheme}>
          <Icon className="text-xl" name={theme === 'light' ? 'app_lamp_on' : 'app_lamp_off'} />
        </button>
      </div>
    </header>
  )
}

export default Header
