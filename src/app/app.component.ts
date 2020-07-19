import { Component } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPMIUnion';

  constructor(private API: ApiServiceService) {}

  ngOnInit(): void {
    this.API.getDepartments()
  }
  ngOnChanges(): void {
    
  }
}
