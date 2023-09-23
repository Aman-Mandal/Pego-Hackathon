export const contractAddress = "0xC3F51a90Cb9403107462238f66A0442c372c1796";
export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "call",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "keepers",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "registerKeeper",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawfee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const DUMMY_RESPONSE = {
  success: true,
  response: {
    ABI: '"[\\n    {\\n      \\"anonymous\\": false,\\n      \\"inputs\\": [\\n        {\\n          \\"indexed\\": true,\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"owner\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"indexed\\": true,\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"spender\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"indexed\\": false,\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"value\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"name\\": \\"Approval\\",\\n      \\"type\\": \\"event\\"\\n    },\\n    {\\n      \\"anonymous\\": false,\\n      \\"inputs\\": [\\n        {\\n          \\"indexed\\": true,\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"from\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"indexed\\": true,\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"to\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"indexed\\": false,\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"value\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"name\\": \\"Transfer\\",\\n      \\"type\\": \\"event\\"\\n    },\\n    {\\n      \\"inputs\\": [\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"owner\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"spender\\",\\n          \\"type\\": \\"address\\"\\n        }\\n      ],\\n      \\"name\\": \\"allowance\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"spender\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"value\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"name\\": \\"approve\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"bool\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"bool\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"nonpayable\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"owner\\",\\n          \\"type\\": \\"address\\"\\n        }\\n      ],\\n      \\"name\\": \\"balanceOf\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [],\\n      \\"name\\": \\"decimals\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"uint8\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"uint8\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [],\\n      \\"name\\": \\"name\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"string\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"string\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [],\\n      \\"name\\": \\"symbol\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"string\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"string\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [],\\n      \\"name\\": \\"totalSupply\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"view\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"to\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"value\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"name\\": \\"transfer\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"bool\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"bool\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"nonpayable\\",\\n      \\"type\\": \\"function\\"\\n    },\\n    {\\n      \\"inputs\\": [\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"from\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"internalType\\": \\"address\\",\\n          \\"name\\": \\"to\\",\\n          \\"type\\": \\"address\\"\\n        },\\n        {\\n          \\"internalType\\": \\"uint256\\",\\n          \\"name\\": \\"value\\",\\n          \\"type\\": \\"uint256\\"\\n        }\\n      ],\\n      \\"name\\": \\"transferFrom\\",\\n      \\"outputs\\": [\\n        {\\n          \\"internalType\\": \\"bool\\",\\n          \\"name\\": \\"\\",\\n          \\"type\\": \\"bool\\"\\n        }\\n      ],\\n      \\"stateMutability\\": \\"nonpayable\\",\\n      \\"type\\": \\"function\\"\\n    }\\n  ]"',
    contractAddress: "0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be",
    functionName: "transfer",
    id: "YOAN4s7uM0YgGuFzSVEhtvmXSxTfofdB0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be",
    isExecuted: false,
    name: "Test job",
    params: ["0x", "23"],
    scheduledAt: 1687000586,
    scheduledBy: "0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be",
    scheduledTime: 1687356180,
  },
};

export const keeperABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "call",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "keepers",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "registerKeeper",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawfee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
