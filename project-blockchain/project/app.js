const contractABI = [
    // AddPayer function
    {
        "inputs": [
            {"internalType": "address", "name": "_payer", "type": "address"},
            {"internalType": "string", "name": "_name", "type": "string"},
            {"internalType": "uint256", "name": "_roomNo", "type": "uint256"},
            {"internalType": "uint256", "name": "_startDate", "type": "uint256"},
            {"internalType": "uint256", "name": "_endDate", "type": "uint256"}
        ],
        "name": "addPayer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // AddToIllegal function
    {
        "inputs": [
            {"internalType": "address", "name": "_payer", "type": "address"}
        ],
        "name": "addToIllegal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // RecordPayment function
    {
        "inputs": [
            {"internalType": "address", "name": "_payer", "type": "address"},
            {"internalType": "uint256", "name": "_amount", "type": "uint256"},
            {"internalType": "uint256", "name": "_paymentDate", "type": "uint256"},
            {"internalType": "bool", "name": "_onTime", "type": "bool"},
            {"internalType": "uint256", "name": "_gracePeriod", "type": "uint256"},
            {"internalType": "bool", "name": "_paid", "type": "bool"}
        ],
        "name": "recordPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // ReviewAppeal function
    {
        "inputs": [
            {"internalType": "address", "name": "_payer", "type": "address"},
            {"internalType": "bool", "name": "_removeFromIllegal", "type": "bool"}
        ],
        "name": "reviewAppeal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // SubmitAppeal function
    {
        "inputs": [],
        "name": "submitAppeal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // GetLegalList function
    {
        "inputs": [],
        "name": "getLegalList",
        "outputs": [
            {"internalType": "address[]", "name": "", "type": "address[]"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // GetIllegalList function
    {
        "inputs": [],
        "name": "getIllegalList",
        "outputs": [
            {"internalType": "address[]", "name": "", "type": "address[]"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // PayerDetails function
    {
        "inputs": [
            {"internalType": "address", "name": "", "type": "address"}
        ],
        "name": "payerDetails",
        "outputs": [
            {"internalType": "string", "name": "name", "type": "string"},
            {"internalType": "uint256", "name": "roomNo", "type": "uint256"},
            {"internalType": "address", "name": "payAddress", "type": "address"},
            {"internalType": "uint256", "name": "contractStartDate", "type": "uint256"},
            {"internalType": "uint256", "name": "contractEndDate", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // PaymentHistory function
    {
        "inputs": [
            {"internalType": "address", "name": "", "type": "address"},
            {"internalType": "uint256", "name": "", "type": "uint256"}
        ],
        "name": "paymentHistory",
        "outputs": [
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
            {"internalType": "uint256", "name": "paymentDate", "type": "uint256"},
            {"internalType": "bool", "name": "onTime", "type": "bool"},
            {"internalType": "uint256", "name": "gracePeriod", "type": "uint256"},
            {"internalType": "bool", "name": "paid", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0x68Ad5dA6dE2d66C294092f0744a04504577e1b10'

document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(() => {
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                // Event listener for "Add Payer" button
                document.getElementById('addPayerButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('payerAddress').value;
                        const payerName = document.getElementById('payerName').value;
                        const roomNumber = parseInt(document.getElementById('roomNumber').value);
                        const startDate = parseInt(document.getElementById('startDate').value);
                        const endDate = parseInt(document.getElementById('endDate').value);

                        const accounts = await web3.eth.getAccounts();
                        const result = await contract.methods.addPayer(payerAddress, payerName, roomNumber, startDate, endDate)
                            .send({ from: accounts[0] });

                        document.getElementById('result').innerText = `Payer added successfully: ${result.transactionHash}`;
                    } catch (error) {
                        console.error('Error adding payer:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Add to Illegal" button
                document.getElementById('addToIllegalButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('illegalPayerAddress').value;

                        const accounts = await web3.eth.getAccounts();
                        const result = await contract.methods.addToIllegal(payerAddress)
                            .send({ from: accounts[0] });

                        document.getElementById('result').innerText = `Payer added to illegal list successfully: ${result.transactionHash}`;
                    } catch (error) {
                        console.error('Error adding payer to illegal list:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Record Payment" button
                document.getElementById('recordPaymentButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('payerAddress').value;
                        const amount = parseFloat(document.getElementById('amount').value);
                        const paymentDate = parseInt(document.getElementById('paymentDate').value);
                        const onTime = document.getElementById('onTime').checked;
                        const gracePeriod = parseInt(document.getElementById('gracePeriod').value);
                        const paid = document.getElementById('paid').checked;

                        const accounts = await web3.eth.getAccounts();
                        const result = await contract.methods.recordPayment(payerAddress, amount, paymentDate, onTime, gracePeriod, paid)
                            .send({ from: accounts[0] });

                        document.getElementById('result').innerText = `Payment recorded successfully: ${result.transactionHash}`;
                    } catch (error) {
                        console.error('Error recording payment:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Review Appeal" button
                document.getElementById('reviewAppealButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('appealPayerAddress').value;
                        const removeFromIllegal = document.getElementById('removeFromIllegal').checked;

                        const accounts = await web3.eth.getAccounts();
                        const result = await contract.methods.reviewAppeal(payerAddress, removeFromIllegal)
                            .send({ from: accounts[0] });

                        document.getElementById('result').innerText = `Appeal reviewed successfully: ${result.transactionHash}`;
                    } catch (error) {
                        console.error('Error reviewing appeal:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Submit Appeal" button
                document.getElementById('submitAppealButton').addEventListener('click', async () => {
                    try {
                        const accounts = await web3.eth.getAccounts();
                        const result = await contract.methods.submitAppeal()
                            .send({ from: accounts[0] });

                        document.getElementById('result').innerText = `Appeal submitted successfully: ${result.transactionHash}`;
                    } catch (error) {
                        console.error('Error submitting appeal:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Get Legal List" button
                document.getElementById('getLegalListButton').addEventListener('click', async () => {
                    try {
                        const result = await contract.methods.getLegalList().call();
                        document.getElementById('result').innerText = `Legal List: ${result.join(', ')}`;
                    } catch (error) {
                        console.error('Error fetching legal list:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Get Illegal List" button
                document.getElementById('getIllegalListButton').addEventListener('click', async () => {
                    try {
                        const result = await contract.methods.getIllegalList().call();
                        document.getElementById('result').innerText = `Illegal List: ${result.join(', ')}`;
                    } catch (error) {
                        console.error('Error fetching illegal list:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Get Payer Details" button
                document.getElementById('getPayerDetailsButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('getPayerAddress').value;

                        const result = await contract.methods.payerDetails(payerAddress).call();
                        document.getElementById('result').innerText =
                            `Name: ${result.name}\n` +
                            `Room Number: ${result.roomNo}\n` +
                            `Contract Start Date: ${result.contractStartDate}\n` +
                            `Contract End Date: ${result.contractEndDate}`;
                    } catch (error) {
                        console.error('Error fetching payer details:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });

                // Event listener for "Get Payment History" button
                document.getElementById('getPaymentHistoryButton').addEventListener('click', async () => {
                    try {
                        const payerAddress = document.getElementById('getPayerAddress').value;
                        const paymentIndex = parseInt(document.getElementById('paymentIndex').value);

                        const result = await contract.methods.paymentHistory(payerAddress, paymentIndex).call();
                        document.getElementById('result').innerText =
                            `Amount: ${result.amount}\n` +
                            `Payment Date: ${result.paymentDate}\n` +
                            `On Time: ${result.onTime}\n` +
                            `Grace Period: ${result.gracePeriod}\n` +
                            `Paid: ${result.paid}`;
                    } catch (error) {
                        console.error('Error fetching payment history:', error);
                        document.getElementById('result').innerText = `Error: ${error.message}`;
                    }
                });
            })
            .catch(error => {
                console.error('Error connecting to Metamask:', error);
                document.getElementById('result').innerText = `Error: ${error.message}`;
            });

    } else {
        console.error('Metamask not detected!');
        document.getElementById('result').innerText = 'Metamask not detected! Please install Metamask to use this feature.';
    }
});

