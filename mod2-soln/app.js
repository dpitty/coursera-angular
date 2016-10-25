(function() {
  'use strict';
  angular.module("KillingApp", [])
  .controller("HitListController", HitListController)
  .controller("KillBoardController", KillBoardController)
  .service("MurderTrackerService", MurderTrackerService);

  HitListController.$inject = ['MurderTrackerService'];
  function HitListController(MurderTrackerService) {
    var targets = this;

    targets.targetList = MurderTrackerService.getTargetList();

    targets.kill = function (index) {
      MurderTrackerService.kill(index);
    }

    targets.addTarget = function() {
      MurderTrackerService.addTarget(targets.newTargetName, targets.newTargetBounty);
    }
  }

  KillBoardController.$inject = ["MurderTrackerService"];
  function KillBoardController(MurderTrackerService) {
    var kills = this;

    kills.killedList = MurderTrackerService.getKilledList();

    kills.getBountyIncome = function() { return MurderTrackerService.getBountyIncome() };
  }

  function MurderTrackerService() {
    var service = this;
    var targetList = [{name: "Trump", bounty: 400}, {name: "Cheney", bounty: 800}, {name: "Rumsfeld", bounty: 80000}];
    var killedList = [];
    var bountyIncome = 0;


    service.addTarget = function(name, bounty) {
      targetList.push({name: name, bounty: bounty});
    }

    service.kill = function (index) {
      if (!isNaN(targetList[index].bounty)) bountyIncome += targetList[index].bounty;
      killedList.push(targetList[index]);
      targetList.splice(index, 1);
    }

    service.getTargetList = function() { return targetList; }
    service.getKilledList = function() { return killedList; }
    service.getBountyIncome = function() { return bountyIncome; }
  }

})();
