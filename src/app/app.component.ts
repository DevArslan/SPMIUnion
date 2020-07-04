import { Component } from '@angular/core';
import { ApiServiceService } from "src/app/shared/api-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPMIUnion';

  constructor(private apiServiceService: ApiServiceService) {}

  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    this.apiServiceService.getDepartments()
  }
}
