'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Icon, Input } from '@repo/ui'
import SelectChain from './SelectChain'
import FormMultisig from './FormMultisig'

const CreateMultisigScreen = () => {
  const [isAppoved, setIsApproved] = useState<boolean>(false)
  const handleApprove = () => {
    setIsApproved(true)
  }
  if (isAppoved) {
    return <FormMultisig />
  }
  return (
    <div className="h-screen all-cente w-full">
      <div className="p-8 border all-center flex-col gap-4 rounded-lg">
        <div className="gap-4 mx-auto all-center">
          <Image
            src="https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364"
            alt="avt_multisig_wallet"
            width={200}
            height={200}
          />
          <Button variant={'outline'} className="">
            <Icon name="app_upload" className="size-5" />
            <p>Upload file</p>
          </Button>
        </div>
        <div className="flex gap-x-2 ">
          <SelectChain />
          <Input placeholder="Type Multisig wallet" className="border border-backgroundInput" />
        </div>
        <Button onClick={handleApprove}>Continute</Button>
      </div>
    </div>
  )
}

export default CreateMultisigScreen
