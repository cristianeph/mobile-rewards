import {Component, Input, OnInit} from '@angular/core';
import {IReward} from "~/app/classes/interfaces/reward-interface";

@Component({
  selector: 'ns-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
  moduleId: module.id,
})
export class RewardComponent implements OnInit {
  @Input() reward: IReward;

  constructor() { }

  ngOnInit() {
  }

}
