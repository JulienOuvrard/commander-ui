import { Component, OnInit } from '@angular/core';
import { Round } from '../models/round.model';
import { RoundsService } from '../services/rounds.service';

@Component({
  selector: 'cmdr-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent implements OnInit {

  rounds: Round[];
  constructor(private RoundService: RoundsService) { }

  ngOnInit() {
    this.getRounds();
  }
  getRounds() {
    this.RoundService.getRounds().subscribe(rounds => {
      this.rounds = rounds;
    });
  }
  editRound(roundId: string) {

  }
  deleteRound(roundId: string) {

  }
}
