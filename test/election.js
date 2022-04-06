var Election = artifacts.require("./Election.sol");


contract("Election", async function(accounts){
   var electionInstance;
   var candidatesCount;
   it("Initialised with 2 candidates", async function(){

       electionInstance = await Election.deployed();
       candidatesCount = await electionInstance.candidatesCount();
        assert.equal(candidatesCount,2);
        return 
        
    });

    it("Initialising candidates with correct value", async function(){
        electionInstance = await Election.deployed();

        candidate1 = await electionInstance.candidates(1);
        assert.equal(candidate1[0],1,"Correct Id");
        assert.equal(candidate1[1],"Hunar","Correct Name");
        assert.equal(candidate1[2],0,"Correct Vote Count");

        candidate2 = await electionInstance.candidates(2);
        assert.equal(candidate2[0],2,"Correct Id");
        assert.equal(candidate2[1],"Utsav","Correct Name");
        assert.equal(candidate2[2],0,"Correct Vote Count");
        return 
     });
});