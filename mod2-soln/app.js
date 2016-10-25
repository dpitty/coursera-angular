(function() {
  'use strict';
  angular.module("KillingApp", [])
  .controller("HitListController", HitListController)
  .controller("KillBoardController", KillBoardController)
  .service("MurderTrackerService", MurderTrackerService);

  HitListController.$inject = ['MurderTrackerService'];
  function HitListController(MurderTrackerService) {
    var hitList = this;
    hitList.toKill = [{name: "Trump", bounty: 400}, {name: "Cheney", bounty: 800}, {name: "Rumsfeld", bounty: 80000}];
    hitList.selectKill = function (index) {
      MurderTrackerService.addKill(hitList.toKill[index]);
      hitList.toKill.splice(index, 1);
    }
    hitList.addTarget = function() {
      console.log({name: hitList.newTargetName, bounty: hitList.newTargetBounty});
      if (isNaN(hitList.newTargetBounty)) {
        hitList.newTargetBounty = 0;
      }
      hitList.toKill.push({name: hitList.newTargetName, bounty: hitList.newTargetBounty});
    }
  }

  KillBoardController.$inject = ["MurderTrackerService"];
  function KillBoardController(MurderTrackerService) {
    var killBoard = this;
    killBoard.killed = MurderTrackerService.getKilledList();//[{name: "Putin", bounty: 6000}];
    killBoard.sumBounty = function() {
      //killBoard.bountyIncome = MurderTrackerService.getBountyIncome();
      return MurderTrackerService.getBountyIncome();
    };
  }

  function MurderTrackerService() {
    var service = this;
    var hitList = [];
    var killedList = [];
    var bountyIncome = 0;

    service.addKill = function (victim) {
      //console.log("You killed", victim.name);
      killedList.push({name: victim.name, bounty: victim.bounty});
      bountyIncome += Number(victim.bounty);
    }

    service.getKilledList = function() { return killedList; }
    service.getBountyIncome = function() { return bountyIncome; }
  }

})();
