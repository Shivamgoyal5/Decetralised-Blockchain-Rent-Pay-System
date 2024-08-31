// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract RentPay {
    mapping(address => PayerDetail) public payerDetails;
    
    struct PayerDetail {
        string name;
        uint256 roomNo;
        address payAddress;
        uint256 contractStartDate;
        uint256 contractEndDate;
    }

    struct Payment {
        uint256 amount;
        uint256 paymentDate;
        bool onTime;
        uint256 gracePeriod;
        bool paid;
    }

    mapping(address => Payment[]) public paymentHistory;

    address[] private legal; // Changed to private
    address[] private illegal; // Changed to private

    mapping(address => bool) public appeals; // Mapping to track appeals

    // Event to log when a payer is added
    event PayerAdded(address payer);
    
    // Event to log when a payment is recorded
    event PaymentRecorded(address payer, uint256 amount, bool paid);

    // Event to log when an appeal is submitted
    event AppealSubmitted(address payer);

    // Event to log when a payer is removed from the illegal list
    event PayerRemovedFromIllegal(address payer);

    // Function to add a payer with required start and end dates
    function addPayer(address _payer, string memory _name, uint256 _roomNo, uint256 _startDate, uint256 _endDate) public {
        require(_endDate > _startDate, "End date must be after start date");
        
        payerDetails[_payer] = PayerDetail({
            name: _name,
            roomNo: _roomNo,
            payAddress: _payer,
            contractStartDate: _startDate,
            contractEndDate: _endDate
        });

        legal.push(_payer);
        emit PayerAdded(_payer);
    }

    // Function to record a payment for a payer
    function recordPayment(address _payer, uint256 _amount, uint256 _paymentDate, bool _onTime, uint256 _gracePeriod, bool _paid) public {
        Payment memory newPayment = Payment({
            amount: _amount,
            paymentDate: _paymentDate,
            onTime: _onTime,
            gracePeriod: _gracePeriod,
            paid: _paid
        });

        paymentHistory[_payer].push(newPayment);
        emit PaymentRecorded(_payer, _amount, _paid);

        // Notify payer if they paid late
        if (!_onTime) {
            emit PaymentRecorded(_payer, _amount, _paid);
        }
    }

    // Function to push a payer to the illegal list
    function addToIllegal(address _payer) public {
        uint256 lateCount = 0;

        Payment[] memory payments = paymentHistory[_payer];
        for (uint i = 0; i < payments.length; i++) {
            if (!payments[i].onTime) {
                lateCount++;
            }
        }

        if (lateCount >= 3) {
            bool alreadyInIllegal = false;
            for (uint i = 0; i < illegal.length; i++) {
                if (illegal[i] == _payer) {
                    alreadyInIllegal = true;
                    break;
                }
            }

            if (alreadyInIllegal) {
                removeFromLegal(_payer);
                removeFromIllegal(_payer);
            } else {
                illegal.push(_payer);
                emit AppealSubmitted(_payer); // Notify about potential addition
            }
        } else {
            revert("Not enough late payments to add to the illegal list.");
        }
    }

    // Function to update the contract start and end dates for a specific payer
    function updateContractDates(address _payer, uint256 _newStartDate, uint256 _newEndDate) public {
        require(_newEndDate > _newStartDate, "End date must be after start date");
        payerDetails[_payer].contractStartDate = _newStartDate;
        payerDetails[_payer].contractEndDate = _newEndDate;
    }

    // Function for payers to submit an appeal
    function submitAppeal() public {
        require(isInIllegalList(msg.sender), "You are not in the illegal list.");
        appeals[msg.sender] = true;
        emit AppealSubmitted(msg.sender);
    }

    // Function to review and act upon appeals
    function reviewAppeal(address _payer, bool _removeFromIllegal) public {
        require(appeals[_payer], "No appeal submitted by this payer.");
        
        if (_removeFromIllegal) {
            removeFromIllegal(_payer);
            removeFromLegal(_payer);
            emit PayerRemovedFromIllegal(_payer);
        }

        // Reset the appeal status
        appeals[_payer] = false;
    }

    // Function to get the legal list
    function getLegalList() public view returns (address[] memory) {
        return legal;
    }

    // Function to get the illegal list
    function getIllegalList() public view returns (address[] memory) {
        return illegal;
    }

    // Internal function to remove a payer from the legal list
    function removeFromLegal(address _payer) internal {
        for (uint i = 0; i < legal.length; i++) {
            if (legal[i] == _payer) {
                legal[i] = legal[legal.length - 1];
                legal.pop();
                break;
            }
        }
    }

    // Internal function to remove a payer from the illegal list
    function removeFromIllegal(address _payer) internal {
        for (uint i = 0; i < illegal.length; i++) {
            if (illegal[i] == _payer) {
                illegal[i] = illegal[illegal.length - 1];
                illegal.pop();
                break;
            }
        }
    }

    // Helper function to check if a payer is in the illegal list
    function isInIllegalList(address _payer) internal view returns (bool) {
        for (uint i = 0; i < illegal.length; i++) {
            if (illegal[i] == _payer) {
                return true;
            }
        }
        return false;
    }
}
