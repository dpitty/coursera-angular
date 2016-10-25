(function() {
  'use strict';
  angular.module("KillingApp", [])
  .controller("HitListController", HitListController)
  .controller("KillBoardController", KillBoardController)
  .service("MurderTrackerService", MurderTrackerService);

  HitListController.$inject = ['MurderTrackerService'];
  function HitListController(MurderTrackerService) {
    var toKill = this;
    toKill.targetList = [{name: "Trump", bounty: 400}, {name: "Cheney", bounty: 800}, {name: "Rumsfeld", bounty: 80000}];
    toKill.kill = function (index) {
      MurderTrackerService.addKill(toKill.targetList[index]);
      toKill.targetList.splice(index, 1);
    }
    toKill.addTarget = function() {
      console.log({name: toKill.newTargetName, bounty: toKill.newTargetBounty});
      if (isNaN(toKill.newTargetBounty)) {
        toKill.newTargetBounty = 0;
      }
      toKill.targetList.push({name: toKill.newTargetName, bounty: toKill.newTargetBounty});
    }
  }

  KillBoardController.$inject = ["MurderTrackerService"];
  function KillBoardController(MurderTrackerService) {
    var killBoard = this;
    killBoard.victimList = MurderTrackerService.getKilledList();//[{name: "Putin", bounty: 6000}];
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
