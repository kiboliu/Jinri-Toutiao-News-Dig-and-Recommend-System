import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
  problems: Problem[];
  subscriptionProblem: Subscription;
  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.getProblems();
  }
  ngOnDestroy() {
    this.subscriptionProblem.unsubscribe();
  }
  getProblems(): void {
    //this.problems = this.dataService.getProblems();
    this.subscriptionProblem = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
