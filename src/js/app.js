const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Must install MetaMask");
      }
    });
  });
};

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  appInstance : null,
  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {

    App.web3Provider = window.ethereum;
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: async function() {
    $.getJSON("Election.json", function(election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    });
  },


  render: async function() {
    
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
    
   

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = await accounts[0];
    App.account = account;
    App.appInstance = await App.contracts.Election.deployed()
    var candidatesCount =  await App.appInstance.candidatesCount()
    
    var candidatesSelect = $('#candidatesSelect').empty();
    var candidatesResults = $("#candidatesResults").empty();


    
    $("#accountAddress").html("Your Account: " + account);

    for (var i = 1; i <= candidatesCount; i++) {
      var candidate = await App.appInstance.candidates(i);
        var id = candidate[0];
        var name = candidate[1];
        var voteCount = candidate[2];

        var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
        candidatesResults.append(candidateTemplate);

        var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
        candidatesSelect.append(candidateOption);
      
    }
    

    var hasVoted = await App.appInstance.voters(App.account);
    if(hasVoted) {
      $('form').hide();
    }
    loader.hide();
    content.show();
  },

  castVote: async function() {
    var candidateId = $('#candidatesSelect').val();
    var result = await App.appInstance.vote(candidateId, { from: App.account })
    console.log(result)
    $("#content").hide();
    $("#loader").show();
    if (result != undefined){
      App.render();
    }
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

