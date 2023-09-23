# PegoCall

PegoCall is a powerful tool that enables Web3 developers to automate and manage smart contract functions effortlessly on the Pego (Filecoin Virtual Machine).

[demo video]()

[live link]()

## Technologies Used


### Push

The Push technology was leveraged to send notifications to users after the execution of a job. This feature enhances the user experience by keeping them informed about the status and progress of their automated tasks. Users will receive timely updates, allowing them to stay connected and engaged with the PegoCall Dapp.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/backend/push/index.js)

### Lit Protocol

The Lit Protocol was integrated into the PegoCall Dapp, specifically the PKPS (Public Key Page Signer), which allows users to conveniently authenticate using their Google accounts. By utilizing Lit Protocol, the authentication process is streamlined, reducing friction for users and providing a seamless login experience.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/LIT/LIT.js)

### ENS(Ethereum Name Service)

To enhance the user experience and provide personalized information, PegoCall utilized the Ethereum Name Service (ENS). ENS allows the retrieval and display of the name and profile image associated with a connected wallet address. By incorporating ENS, users can easily recognize and identify their connected addresses, making the interface more user-friendly and intuitive.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/ENS/index.js)

### Polybase

PegoCall made full use of Polybase, a technology that efficiently stores all job-related information. With Polybase, you can securely store and manage important data related to automated tasks, ensuring the integrity and reliability of job information throughout the process. This technology provides a robust foundation for managing and accessing job-related data within the PegoCall application.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/backend/helpers/polybaseQueries.js)

### Drand

In order to support the execution of jobs requiring random number generation, PegoCall integrated Drand randomness. Drand ensures the generation of reliable and secure random numbers, which is crucial for various applications that rely on randomization. By incorporating Drand into PegoCall, you can trust the integrity and randomness of the numbers generated within your automated tasks.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/Drand/index%20.js)


## Automated Functionality

PegoCall provides two methods for automating smart contract calls:

- Time-based Method: Using this method, you can automate smart contract function calls by providing the contract address, ABI, and the specific function you want to automate. Additional information such as task name can also be provided. PegoCall will execute the function based on a predefined time schedule.
- Custom Logic Method: In this method, you enter the contract address and ABI, and the automated function will be written inside the smart contract itself. PegoCall acts as a user interface to interact with the smart contract and trigger the automated function.

