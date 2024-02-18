
export const abi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "wrapper",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "gasLimit",
            "type": "uint32"
          },
          {
            "internalType": "uint16",
            "name": "confirmations",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "WETH",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "LINK",
            "type": "address"
          },
          {
            "internalType": "contract IUniswapV2Router02",
            "name": "router",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "feeTaker",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "feePercentage",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minBet",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxBet",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxBets",
            "type": "uint256"
          }
        ],
        "internalType": "struct Spinner.Config",
        "name": "config_",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "bet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "config",
    "outputs": [
      {
        "internalType": "address",
        "name": "wrapper",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "gasLimit",
        "type": "uint32"
      },
      {
        "internalType": "uint16",
        "name": "confirmations",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "WETH",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "LINK",
        "type": "address"
      },
      {
        "internalType": "contract IUniswapV2Router02",
        "name": "router",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "feeTaker",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "feePercentage",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minBet",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxBet",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxBets",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createdSpins",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      }
    ],
    "name": "getSpins",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "internalType": "struct Spinner.Bet[]",
            "name": "bets",
            "type": "tuple[]"
          },
          {
            "internalType": "bool",
            "name": "vrfRequested",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "finalised",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "winningBet",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "winnings",
            "type": "uint256"
          }
        ],
        "internalType": "struct Spinner.Spin[]",
        "name": "spins",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quoteVrfRequest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "link",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_randomWords",
        "type": "uint256[]"
      }
    ],
    "name": "rawFulfillRandomWords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "requestIdToSpinId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "spin",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export const addresses = {
    5: '0x3AD08C3422D97D5Cf728626d91Ce5f2dB26699a2',
    43114: "0x39671C62c4b17E555b5Eb65cE1175a4E9D6D6046"
}

