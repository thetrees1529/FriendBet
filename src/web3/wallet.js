import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/vue'
import {abi, addresses} from "./contract.js"
import {ethers} from "ethers"
const projectId = '859ae4f8954aa5a0c905dfdc08835318'

const avalanche = {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    currency: 'AVAX',
    explorerUrl: 'https://cchain.explorer.avax.network',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
}

const goerli = {
    chainId: 5,
    name: 'Goerli',
    currency: 'ETH',
    explorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://eth-goerli.public.blastapi.io'
}

createWeb3Modal({
    ethersConfig: defaultConfig({}),
    chains: [goerli],
    defaultChain: goerli,
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export const getContract = async () => {
    const provider = new ethers.BrowserProvider(useWeb3ModalProvider().walletProvider.value)
    const signer = await provider.getSigner()
    return new ethers.Contract(addresses[(await provider.getNetwork()).name], abi, signer)
}