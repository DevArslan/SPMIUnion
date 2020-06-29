import { Component, OnInit } from '@angular/core';
import { StructuresRoutingService } from "src/app/shared/structures-routing.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-structures-table',
  templateUrl: './structures-table.component.html',
  styleUrls: ['./structures-table.component.scss']
})
export class StructuresTableComponent implements OnInit {
  @Input() selectedSubDepartments: {}[]

  data: {}[]

  constructor(private structureRouting: StructuresRoutingService) {}

  ngOnInit(): void {




  }


}
