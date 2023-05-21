import { Component } from '@angular/core';
import {GetResultsResponse} from "../../../model/up/Results";
import {SessionService} from "../../../service/session.service";

@Component({
  selector: 'app-results-session',
  templateUrl: './results-session.component.html',
  styleUrls: ['./results-session.component.scss']
})
export class ResultsSessionComponent {

  public result: GetResultsResponse = GetResultsResponse.EMPTY;
  constructor(private sessionService: SessionService) {
    this.sessionService.currentResults.subscribe(
      (value) => {
        this.sortResults(value);
        this.result = value;
      }
    )
  }



  sortResults(results: any) {
    this.result.results.sort((a, b) => b.average - a.average)
    console.log(results);
  }

  protected readonly GetResultsResponse = GetResultsResponse;
}
