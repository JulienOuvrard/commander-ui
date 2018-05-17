import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from '../models/command.model';
import { CommandsService } from '../services/commands.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'cmdr-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.scss']
})
export class CommandDetailComponent implements OnInit {

  commandId: string;
  isNew: boolean;
  commandBody: Command;

  constructor(private router: Router, public route: ActivatedRoute, private commandsService: CommandsService) {
    this.route.params.subscribe(params => {
      this.commandId = params['id'];
      this.isNew = this.commandId === '' || this.commandId === undefined || this.commandId === null;
    });
  }

  ngOnInit() {
    if (this.isNew) {
      const date = new Date();
      this.commandBody = {
        name: null,
        price: 0,
        drinks: [],
        rounds: [],
        meals: [],
        isPaid: false,
        created: date,
        updated: date
      };
    } else {
      this.getCommand(this.commandId);
    }
  }

  getCommand(commandId: string) {
    this.commandsService.getCommand(commandId).subscribe(command => this.commandBody = command);
  }

  saveCommand() {
    this.commandsService.saveCommand(this.commandBody).subscribe(res => {
      console.log(res);
    });
  }

  updateCommand() {
    this.commandBody.updated = new Date();
    this.commandsService.updateCommand(this.commandId, this.commandBody).subscribe(res => {
      console.log(res);
    });
  }

  goBack() {
    this.router.navigate(['commands']);
  }
}
