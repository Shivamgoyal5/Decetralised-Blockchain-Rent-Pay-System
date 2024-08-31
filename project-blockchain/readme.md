### README.md

# RentPay Full Stack Project
![alt text](<Screenshot 2024-08-25 122209.png>)
## Vision
The **RentPay Full Stack Full Stack Project**  is designed to revolutionize the rental payment system by providing a transparent, decentralized, and automated way to manage tenant payments and track contractual obligations. The full stack solution integrates a smart contract with a web interface to handle payments efficiently, maintain clear records, and ensure fair treatment through an appeal mechanism for late payments. The system categorizes tenants into legal and illegal lists based on their payment behavior and provides mechanisms for appeals and owner interventions.

## Project Features
- **Owner-Only Access**: Only the contract owner (deployer) can perform specific actions like adding tenants, recording payments, and reviewing appeals.
- **Tenant Management**: The contract allows the owner to add tenants with specific contract dates and update these dates as needed.
- **Payment Recording**: Payments made by tenants can be recorded, specifying the amount, payment date, whether it was on time, and if it was within a grace period.
- **Legal and Illegal Lists**: Tenants are automatically managed into legal and illegal lists based on their payment history, particularly late payments.
- **Appeal Mechanism**: Tenants who find themselves on the illegal list can submit appeals, which the owner can review and act upon.
- **Transparent Record-Keeping**: Tenants can view their details and entire payment history, promoting transparency.
- **Event Logging**: Key actions such as adding tenants, recording payments, submitting appeals, and updating lists trigger events for easy tracking.

## Future Scope
- **Automated Payment Processing**: Integrating with payment gateways to allow automatic payment logging and on-chain rent payments.
- **Multi-Signature Ownership**: Expanding the owner role to a multi-signature wallet for more decentralized governance.
- **Penalty System**: Implementing an automated penalty system for late payments that could deduct penalties directly from the payer's deposit.
- **Integration with Decentralized Identity (DID)**: Allowing tenants to use decentralized identities for seamless verification and history tracking across multiple rental contracts.
- **Enhanced Appeal Process**: Developing a more sophisticated appeal system where a committee of addresses (oracles) can vote on the outcome.
- **Scalability and Interoperability**: Adapting the contract for use on different blockchains and integrating it with existing property management systems.

## Project Structure
```
RentPay/
├── contracts/
│   └── RentPay.sol         # The smart contract file written in Solidity.
├── migrations/
│   └── 1_initial_migration.js   # Migration script for deployment.
├── src/
│   ├── components/        # React components for the frontend.
│   ├── services/          # Service files for interacting with the smart contract.
│   ├── App.js             # Main application file.
│   └── index.js           # Entry point of the React application.
├── public/
│   ├── index.html         # Main HTML file for the frontend.
│   └── assets/            # Static assets such as images.
├── test/
│   └── RentPay.test.js     # Test scripts for contract functions (if any).
├── README.md               # Project documentation.
└── package.json            # Node.js project file (for dependencies and scripts).

```

### Contracts
- **RentPay.sol**: The core smart contract file that includes all the logic for managing tenants, payments, and appeals.

### Migrations
- **1_initial_migration.js**: Script to handle the deployment of the RentPay contract onto the blockchain.

### Frontend
- **components**: Contains React components for the user interface.
- **services**: Contains service files to interact with the smart contract.
- **App.js**: Main application file for React.
- **index.js**: Entry point for the React application.

### Test
- **RentPay.test.js**: JavaScript-based test scripts to ensure the smart contract functions as expected. (You can add test cases here).

## Developer Details
- **Developer**: [Shivam Goyal]


## Deployment 
Chain Nmae: Educhain Open Campus 
Contract Id: 0x68Ad5dA6dE2d66C294092f0744a04504577e1b10
![alt text](<Web Page.png>)



