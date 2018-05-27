import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../services/commands.service';
import { Command } from '../models/command.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cmdr-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  commands: Command[];

  constructor(private CommandService: CommandsService, private router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCommands();
  }

  getCommands() {
    this.CommandService.getCommands().subscribe(commands => {
      this.commands = commands;
    });
  }

  addCommand() {
    this.router.navigate(['commands', 'add']);
  }

  editCommand(commandId: string) {
    this.router.navigate(['commands', commandId]);
  }

  deleteCommand(commandId: string) {
    this.CommandService.deleteCommand(commandId).subscribe(deleted => {
      console.log(deleted);
      this.getCommands();
    });
  }

  printCommand(commandId: string) {
    console.log('print command', commandId);
  }

}
