pragma solidity >=0.4.22 <0.9.0;

contract Election {

    event votedEvent(
        uint indexedCandidateId
    );
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;

    

    uint public candidatesCount;

    constructor() public {
        addCandidate("Spenser");
        addCandidate("Utsav");
    }

    function addCandidate(string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] =  Candidate(candidatesCount,_name,0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;

        emit votedEvent(_candidateId);
    }
}